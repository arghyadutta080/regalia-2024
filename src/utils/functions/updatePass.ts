import { supabase } from "@/lib/supabase-client";

export const updatePass = async (link: string, email: string) => {
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({ pass: link })
      .eq("email", email);
      return userData;
  } catch (e) {
    console.log(e);
  }
};
