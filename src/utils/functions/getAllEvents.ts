import { supabase } from "@/lib/supabase-client";

export const getAllEvents = async()=>{
    try{
        const {data, error } = await supabase.from('events').select('*').eq("fest_name","Regalia").eq("year",2024);
        return data;
    }
    catch(e){
        console.log(e);
    }
}