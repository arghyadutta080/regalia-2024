import { supabase } from "@/lib/supabase-client"


export const deleteEvent = async (eventId:any)=>{
    
    const { error } = await supabase
    .from('events')
    .delete()
    .eq('id',eventId )
    // console.log("Event Deleted Successfully !")
}