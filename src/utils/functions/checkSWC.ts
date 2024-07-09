import { supabase } from "@/lib/supabase-client"

export const checkSWC = async(email:string) => {
    try{
        const { data: users, error: usersError } = await supabase
        .from("SWC")
        .select("college_roll,phone,full_name,email")
        .eq("email", email)
        if (usersError) {
            return;
        }
        return users[0];
    }
    catch(e){
        console.log(e)
    }
}