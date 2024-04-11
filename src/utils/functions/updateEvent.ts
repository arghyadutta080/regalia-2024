import { supabase } from "@/lib/supabase-client";
import { eventInputType } from "@/lib/types/event";

export const updateEvent = async (event: eventInputType, eventId: string) => {
  try {
    const { data: existingEventData, error: existingEventError } =
      await supabase.from("events").select("*").eq("id", eventId).single();

    if (existingEventError) {
      throw existingEventError;
    }

    const { data, error } = await supabase
      .from("events")
      .update({
        // event_category_id: event.category,
        min_team_member: event.minTeamSize,
        max_team_member: event.maxTeamSize,
        event_name: event.name,
        schedule: event.schedule,
        rules: event.rules,
        prize: event.prize,
        event_image_url: event.imagePath,
        registration_fees: event.price,
        desc: event.description,
      })
      .eq("id", eventId)
      .select()
      .order("max_team_member");
    const emails: any = [];

    event?.coordinators?.map((coordinator) => emails.push(coordinator.email));
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id")
      .in("email", emails);

    const userIds: any = [];
    users?.map((user) => {
      userIds.push(user.id);
    });

    userIds.forEach(async (id: any) => {
      const { data: coordinatorData, error: coordinatorError } = await supabase
        .from("roles")
        .insert({
          id: id,
          event_id: eventId,
          role: "event_coordinator",
        })
        .select();
    });
  } catch (error) {
    // console.log(error);
  }
};
