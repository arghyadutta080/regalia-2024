import { supabase } from "@/lib/supabase-client";
import { eventInputType } from "@/lib/types/event";

export const addEvent = async (event: eventInputType) => {
  // console.log(event);
  try {
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .insert({
        fest_name: "Regalia",
        min_team_member: event.minTeamSize,
        max_team_member: event.maxTeamSize,
        event_name: event.name,
        schedule: event.schedule,
        rules: event.rules,
        prize: event.prize,
        event_image_url: event.imagePath,
        registration_fees: event.price,
        year: 2024,
        links: event.links,
        desc: event.description,
        register_through_portal: true,
      })
      .select();
    const emails: any = [];
    event?.coordinators?.map((coordinator) => emails.push(coordinator.email));
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id")
      .in("email", emails);

    const userIds: any = [];
    users?.map((user) => userIds.push(user.id));
    // console.log(userIds);
    const { data: coordinatorData, error: coordinatorError } = await supabase
      .from("roles")
      .insert(
        userIds!.map((id: any) => ({
          id,
          role: "event_coordinator",
          event_id: eventData![0].id,
        })),
      )
      .select();
    console.log(coordinatorData);
    console.log(eventData);
  } catch (e) {
    console.log(e);
  }
};
