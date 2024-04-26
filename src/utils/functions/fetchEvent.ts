import { supabase } from "@/lib/supabase-client";

export const fetchEvent = async(eventName:string)=>{
    try{
        const {data, error } = await supabase.from('events').select('*').eq("event_name",eventName).eq("fest_name","Regalia").eq("year",2024);
        return data![0];
    }
    catch(e){
        // console.log(e);
    }
}