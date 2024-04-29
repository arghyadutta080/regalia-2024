import { supabase } from "@/lib/supabase-client";

export const getRegbyUser = async (user: any) => {
  try {
    const { data: eventData, error: eventError } = await supabase.from("events").select("*").eq("fest_name", "Regalia").eq("year", 2024);
  
    const eventIds: any = eventData?.map((event: any) => event.id);
   
    const registrationArray: any = [];
    await Promise.all(eventIds?.map(async (eventId: any) => {
      const { data: teamData, error: teamError } = await supabase.from('teams').select('*').eq("event_id", eventId);
     
      if (teamData && teamData.length > 0) {
        const { data: participationsData, error: participationsError } = await supabase.from('participations').select('*').eq("team_id", teamData[0].team_id);
       
        teamData[0].members = participationsData;
        registrationArray.push(teamData[0]);
      }
    }));
    return registrationArray;
  } catch (e) {
    console.error("Error:", e);
  }
};
