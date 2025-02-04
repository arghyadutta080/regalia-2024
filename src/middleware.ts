import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./lib/types/supabase";
import { checkUserDetails } from "./utils/functions/checkUserDetails";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(req.nextUrl);
  if (!session) {
    if (
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/coordinator") ||
      url.pathname.startsWith("/entry")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (session) {
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);

    const userRoles = await supabase
      .from("roles")
      .select(
        "role,event_id,events(event_name,fest_name,year),event_categories(fest_name,year)",
      )
      .eq("id", session?.user.id);

    let superAdmin = false;
    let eventCoordinator = false;
    let volunteer = false;
    let convenor = false;
    let registrar = false;
    let security = false;
    let securityAdmin = false;
    if (userRoles && userRoles.data) {
      for (const obj of userRoles.data) {
        if (obj.role === "super_admin") {
          superAdmin = true;
        } else if (obj.role === "event_coordinator") {
          if (
            obj.events &&
            obj.events.fest_name === "Regalia" &&
            obj.events.year == 2024
          ) {
            eventCoordinator = true;
          }
        } else if (obj.role === "volunteer") {
          if (
            obj.events &&
            obj.events.fest_name === "Regalia" &&
            obj.events.year == 2024
          ) {
            volunteer = true;
          }
        } else if (obj.role === "convenor") {
          if (
            obj.event_categories &&
            obj.event_categories.fest_name === "Regalia" &&
            obj.event_categories.year == 2024
          ) {
            convenor = true;
          }
        } else if (obj.role === "registrar") {
          registrar = true;
        } else if (obj.role === "security_admin") {
          securityAdmin = true;
        } else if (obj.role === "security") {
          security = true;
        }
      }
    }

    if (superAdmin && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (registrar && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (eventCoordinator && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (convenor && url.pathname.startsWith("/registrar")) {
      return NextResponse.next();
    }
    if (
      (security || superAdmin || securityAdmin) &&
      url.pathname.startsWith("/entry")
    ) {
      if (
        !superAdmin &&
        !securityAdmin &&
        url.pathname.startsWith("/entry/add")
      ) {
        return NextResponse.redirect(new URL("/entry", req.url));
      }
      return NextResponse.next();
    }

    if (
      (!security || !superAdmin || !securityAdmin) &&
      url.pathname.startsWith("/entry")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (!superAdmin ||
        !registrar ||
        !convenor ||
        !eventCoordinator ||
        !volunteer) &&
      url.pathname.startsWith("/registrar")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      !checkUserDetails(userDetails?.data?.[0]!) &&
      url.pathname !== "/profile"
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (superAdmin && url.pathname.startsWith("/admin" || "/coordinator")) {
      return NextResponse.next();
    }

    if (
      !superAdmin &&
      url.pathname.startsWith(
        "/admin" || url.pathname.startsWith("/coordinator"),
      )
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (eventCoordinator && url.pathname.startsWith("/coordinator")) {
      const eventId = url.pathname.split("/")[2];
      if (eventId != undefined) {
        if (userRoles.data?.find((role) => role.event_id === eventId)) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        return NextResponse.next();
      }
    }

    if (volunteer && url.pathname.startsWith("/coordinator")) {
      const eventId = url.pathname.split("/")[2];
      if (eventId != undefined) {
        if (userRoles.data?.find((role) => role.event_id === eventId)) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        return NextResponse.next();
      }
    }
    if (convenor && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }
    if (superAdmin && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }

    if (
      !eventCoordinator &&
      !volunteer &&
      url.pathname.startsWith("/coordinator")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
