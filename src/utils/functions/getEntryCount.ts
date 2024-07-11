import { supabase } from "@/lib/supabase-client";

export const getEntryCount = async() => {
    try{
        const {data,error} = await supabase.from('SWC').select('*').neq('day2', null );

        return data;
    }
    catch(err){
        console.error(err);
    }
}