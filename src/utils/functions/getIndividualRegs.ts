import { supabase } from "@/lib/supabase-client";
import { getUserInfo } from "./getUserInfo";

export const getIndividualRegs = async (phone: string) => {
  try {
    const { data: participationData, error: participationError } =
      await supabase.from("participations").select("*").eq("phone", phone);

    const registrationArray: any = [];

    const teamIds: any = participationData?.map(
      (participation: any) => participation.team_id,
    );

    await Promise.all(
      teamIds.map(async (teamId: any) => {
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("*,participations(*),events(fest_name,year,event_name)")
          .eq("team_id", teamId);
        if (teamData![0].events.fest_name === "Regalia") {
          registrationArray.push(teamData![0]);
        }
      }),
    );

    return registrationArray;
  } catch (e) {
    console.error("Error:", e);
  }
};
