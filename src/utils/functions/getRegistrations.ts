import { supabase } from "@/lib/supabase-client";

export const getRegistrations = async () => {
   const { data, error } = await supabase.from('events').select('*').eq("fest_name", "Regalia").eq("year", 2024);
   const eventIds: any = data?.map((event: any) => event.id);
   const registrationArray: any = [];
   await Promise.all(eventIds?.map(async (eventId: any) => {
        const { data: teamData, error: teamError } = await supabase.from('teams').select('*,users(email,name,phone,swc)').eq("event_id", eventId);
        const { data: eventData, error: eventError } = await supabase.from('events').select('event_name,fest_name,max_team_member').eq("id", eventId);
       for(const obj of teamData!){
         const { data, error } = await supabase.from('participations').select('*').eq("team_id", obj.team_id);
         obj.events = eventData;
         obj.participations = data;
         registrationArray.push(obj!);
       }
   }));

   return registrationArray;
   
};
