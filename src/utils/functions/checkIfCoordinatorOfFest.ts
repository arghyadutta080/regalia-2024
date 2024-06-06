import { supabase } from "@/lib/supabase-client";

export const checkIfCoordinatorOfFest = async()=>{
       try{
        const {
            data: { session },
          } = await supabase.auth.getSession();
        const userRoles = await supabase
        .from("roles")
        .select("role,event_id,events(event_name,fest_name)")
        .eq("id", session?.user.id);

        // for (const obj of userRoles.data) {

        // }
       }
       catch(e){
        console.log(e);
       }
}