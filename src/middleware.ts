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
      url.pathname.startsWith('/entry')
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
      .select("role")
      .eq("id", session?.user.id);
      
    let superAdmin = false;
    let eventCoordinator = false;
    let convenor = false;
    let registrar = false;
    let security = false;
    if (userRoles && userRoles.data) {
      for (const obj of userRoles.data) {
        if (obj.role === "super_admin") {
          superAdmin = true;
        } else if (obj.role === "event_coordinator") {
          eventCoordinator = true;
        } else if (obj.role === "convenor") {
          convenor = true;
        } else if (obj.role === "registrar") {
          registrar = true;
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
    if ((security || superAdmin) && url.pathname.startsWith("/entry")) {
      return NextResponse.next();
    }

    if ((!security || !superAdmin) && url.pathname.startsWith("/entry")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (!superAdmin || !registrar || !convenor || !eventCoordinator) &&
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

    if (
      superAdmin &&
      url.pathname.startsWith("/admin" || "/coordinator")
    ) {
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
      return NextResponse.next();
    }
    if (convenor && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }
    if (superAdmin && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }

    if (!eventCoordinator && url.pathname.startsWith("/coordinator")) {
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
