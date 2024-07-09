import { supabase } from "@/lib/supabase-client";

export const getAllRolesPeople = async () => {
  try {
    const { data: superAdmins, error: adminErrors } = await supabase
      .from("roles")
      .select("*,users(name,email)")
      .eq("role", "super_admin");
    const { data: security, error: securityErrors } = await supabase
      .from("roles")
      .select("*,users(name,email)")
      .eq("role", "security");
    return { admins: superAdmins, securities: security };
  } catch (err: any) {
    console.error(err);
  }
};
