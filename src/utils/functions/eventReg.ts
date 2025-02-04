import { supabase } from "@/lib/supabase-client";
import { v4 as uuidv4 } from "uuid";
import { v1 as uuidv1 } from "uuid";
import { registrationConfirmationEmail } from "../constants/emails";
import { clearSpaces } from "./validate";
export const eventReg = async (
  team: any,
  participants: any,
  file: any,
  eventId: any,
  swc: boolean,
  rolesData: any
) => {
  let combinedEmails = "";
  const participantEmails = participants.map((participant: any) => participant.email);
  if (participantEmails.length > 1) {
    combinedEmails = participantEmails.join(' , ');
  } else {
    combinedEmails = team.teamLeadEmail;
  }
  console.log(combinedEmails)

  const eventResponse = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  let teamId = "";
  const eventType =
    eventResponse.data![0].max_team_member > 1 ? "team" : "individual";
  if (eventType === "team") {
    const { data } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: clearSpaces(team.teamLeadPhone).trim(),
        transaction_id: swc ? uuidv4() : team.transactionId,
        transaction_ss_filename: swc ? uuidv1() : file.name!,
        referral_code: team.referralCode !== "" ? team.referralCode : "default",
        transaction_verified: swc ? true : false,
        reg_mode: team.regMode,
        college: swc ? "RCCIIT" : team.college,
      })
      .select();
    teamId = data![0].team_id!;
    participants.forEach(async (participant: any) => {
      await supabase
        .from("participations")
        .insert({
          team_id: teamId,
          phone: clearSpaces(participant.phone).trim(),
          name: participant.name,
          email: participant.email,
        })
        .select();
    });
  }

  if (eventType === "individual") {
    const { data: individualData, error: individualError } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: clearSpaces(team.teamLeadPhone).trim(),
        transaction_id: swc ? uuidv4() : team.transactionId,
        transaction_ss_filename: swc ? uuidv1() : file.name!,
        referral_code: team.referralCode !== "" ? team.referralCode : "default",
        transaction_verified: swc ? true : false,
        reg_mode: team.regMode,
        college: swc ? "RCCIIT" : team.college,
      })
      .select();
    teamId = individualData![0].team_id!;
    const { data: participantData, error: participantError } = await supabase
      .from("participations")
      .insert({
        team_id: individualData![0].team_id!,
        phone: clearSpaces(team.teamLeadPhone).trim(),
        name: team.teamLeadName,
        email: team.teamLeadEmail,
      })
      .select();
    if (individualError || participantError) {
      // console.log(individualError, participantError);
    }
    // console.log(individualData, participantData);
  }
  if (!swc) {
    const { data: uploadFile, error: uploadError } = await supabase.storage
      .from("fests")
      .upload(`Regalia/2024/${eventId}/transactions/${file.name!}`, file!);
    if (uploadFile) {
      const email = registrationConfirmationEmail(eventResponse.data![0].event_name, team, participants, rolesData);
      console.log(email)
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email, targetEmails: combinedEmails, subject: `${team.teamName} : Registration Confirmation for ${eventResponse.data![0].event_name} in Regalia 2024` }),
      });
      // console.log(await response.json());
    }
  }



  // console.log(uploadFile);
};
