import { clearSpaces } from "../functions/validate";

export const registrationConfirmationEmail = (
  eventName: string,
  inputs: any,
  participants: any,
  rolesData: any,
) => {
  return `<div style="font-family: 'Poppins, sans-serif'; width: 100%; height:100%;
    overflow: hidden;
    background-image: url('https://i.postimg.cc/Z5D0P2yt/Regalia-Main-1280-x-568-px.png');
    background-position: top center;
    color:#ffffff;
    background-repeat: repeat; line-height: 1.6; margin: 0; padding: 20px; overflow: hidden; position: relative;  margin: auto;">
    <div style="color: #ffffff; width:80%">
      <h2 style="color: #c9a747; font-weight: 600; font-size: 2rem; letter-spacing:3px;">Registration Confirmation for ${eventName} in Regalia 2024</h2>
      <h4 style="font-size:1.4rem">
        Dear ${participants && participants?.length > 1 ? "Team" : ""} ${inputs.teamName},
      </h4>
      <p  style="font-size:1.2rem;color:#ffffff">
        We are delighted to inform you that your registration for the event <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong> has been successfully received. Your enthusiasm for participation is truly appreciated, and we're looking forward to an exciting event ahead!
      </p>
      <h3 style="color: #ffffff; font-weight: 500; font-size:1.4rem">Registration Details :</h3>
      <ul style="color: #ffffff; font-size:1.2rem">
      ${participants && participants.length > 1 ? `<li><strong> Team Name:</strong> ${inputs.teamName}</li>` : ""}
        <li><strong>${participants && participants?.length > 1 ? "Team Leader" : ""} Name:</strong> ${inputs.teamLeadName}</li>
        <li><strong>${participants && participants?.length > 1 ? "Team Leader" : ""} Phone:</strong> <a href="tel: ${clearSpaces(inputs.teamLeadPhone).trim()}" style="color:#008000 ">${clearSpaces(inputs.teamLeadPhone).trim()}</a></li>
        <li style=""><strong>Email:</strong> <span style="color:#008000 ; font-size:1.5rem; letter-spacing:1px">${inputs.teamLeadEmail}</span></li>
      </ul>
      
      
      
      
    
      ${ participants &&
        participants?.length > 1 ?
        `<div style="">
          <h3 style="color: #ffffff; font-weight: 500; font-size:1.4rem">Team Members:</h3>
          <table style=" font-size:1.2rem ">
          <thead>
          <tr>
              <th style="background-color: transparent;  padding:5px 20px ; text-align: center;">Name</th>
              <th style="background-color: transparent; padding: 5px 20px ; text-align: center;">Phone</th>
          </tr>
          </thead>
          <tbody>
          ${participants
            .map(
              (participant: any, index: number) =>
                `<tr key=${index}>
                  <td style=" padding:5px 20px; text-align: center;">${participant.name}</td>
                  <td style=" padding: 5px 20px; text-align: center;"><a href="tel: ${clearSpaces(participant.phone).trim()}">${clearSpaces(participant.phone).trim()}</a></td>
              </tr>`,
            )
            .join("")}
          </tbody>
      </table>
      
        </div>` : ""
      }
      </div>
 
      <p style="font-size:1.4rem; color:#ffffff">For more details regarding ${eventName}, Feel free to Contact Coordinators :</p>
      ${
        rolesData?.length > 0 &&
        rolesData
          .map(
            (role: any, index: number) =>
              `<li key=${index} style="font-size:1.2rem ; color:#ffffff">
            <strong>${role.name} : <a href="tel: ${role.phone}" style="color:#008000 ; font-size:1.5rem; letter-spacing:1px">${role.phone}</a></strong>
          </li>`,
          )
          .join("")
      }
      <br>
     <div style="width:80%">
     <strong style="font-size:1.2rem ; color:#ffffff">
     <span style="color:#FF0000 ; font-size:1.4rem;  letter-spacing:2px">Please note that your registration is currently under verification. Your verification will be verified within 2 days.</span> We kindly ask for your patience and understanding as our team ensures the smooth processing of all registrations. If you have any urgent inquiries, feel free to reach out to us at <a href="mailto: regalia.rcciit.official@gmail.com" style="color:#c9a747; letter-spacing:3px ; font-size:1.5rem; font-weight:600">regalia.rcciit.official@gmail.com</a>.
   </strong>
   <br>
   <p style="font-size:1.4rem; color:#ffffff">
     Thank you once again for choosing to be a part of the <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong>. We wish you the best of luck, and we can't wait to see you showcase your talents!
   </p>
   <p  style="letter-spacing:2px; color: #fffff ; font-size:1.5rem">Follow us :</p>
   <div style="display: flex; justify-content: start; gap:50px ; align-items: center; margin-top: 20px; width:100%">
   <a target="_blank" href="https://www.instagram.com/regalia_rcciit/" style="margin-right: 20px; display:flex; flex-direction:column ; align-items:center"><img src="https://i.postimg.cc/DwLzVwLQ/insta.png" alt="Instagram" style="width: 50px; height: 50px;"></a>
   <a target="_blank" href="https://www.regalia.rcciit.in/" style="margin-right: 20px; display:flex; flex-direction:column ; align-items:center"><img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-globe-icon-png-image_855070.jpg" alt="Facebook" style="width: 50px; height: 50px;"></a>
   <a target="_blank" href="https://rcciit.org.in/" style="display:flex; flex-direction:column ; align-items:center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Mr3yP27qjYesvFvbyOq0gcCrVu70ePAKr01KlyOjAQ&s" alt="Website" style="width: 50px; height: 50px;"></a>
 </div>
   <p style="letter-spacing:2px ; margin-top:5px; font-size:1.5rem ; color:#ffffff">Warm regards,</p>
   <p  style="letter-spacing:2px; color: #c9a747 ; font-size:1.5rem">Regalia 2024</p>
     </div>
  
    </div>
</div>

   `;
};

export const registrationVerificationEmail = (
  eventName: string,
  whatsAppLink: string,
  teamName: string,

  team: any,
  participants: any,
  rolesData: any,
) => {
  return `<div style="font-family: 'Poppins, sans-serif'; width: 100%; height:100%;
    overflow: hidden;
    background-image: url('https://i.postimg.cc/Z5D0P2yt/Regalia-Main-1280-x-568-px.png');
    background-position: top center;
    color:#ffffff;
    background-repeat: repeat; line-height: 1.6; margin: 0; padding: 20px; overflow: hidden; position: relative;  margin: auto;">
    <div style="color: #ffffff; width:80%">
      <h2 style="color: #c9a747; font-weight: 600; font-size: 2rem; letter-spacing:3px;">Registration Confirmation for ${eventName} in Regalia 2024</h2>
      <h4 style="font-size:1.4rem">
        Dear Team ${teamName},
      </h4>
      <p  style="font-size:1.2rem;color:#ffffff">
        We are delighted to inform you that your registration for the event <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong> has been successfully received. Your enthusiasm for participation is truly appreciated, and we're looking forward to an exciting event ahead!
      </p>
      <h3 style="color: #ffffff; font-weight: 500; font-size:1.4rem">Registration Details :</h3>
      <ul style="color: #ffffff; font-size:1.2rem">
        <li><strong>Team Name:</strong> ${teamName}</li>
        ${team.name && `<li><strong>Team Leader Name:</strong> ${team.name}</li>`}
        ${team.phone && `<li><strong>Team Leader Phone:</strong> ${team.phone}</li>`}
        <li style=""><strong>Email:</strong> <span style="color:#008000 ; font-size:1.5rem; letter-spacing:1px">${team.email}</span></li>
      </ul>
      
      <h1>WhatsApp Invitation Link : </h1>
      <a href="${whatsAppLink}" style="color:#008000 ; font-size:1.5rem; letter-spacing:1px">${whatsAppLink}</a>
      
      
    
      ${
        participants?.length > 0 &&
        `<div style="">
          <h3 style="color: #ffffff; font-weight: 500; font-size:1.4rem">Team Members:</h3>
          <table style=" font-size:1.2rem ">
          <thead>
          <tr>
              <th style="background-color: transparent;  padding:5px 20px ; text-align: center;">Name</th>
              <th style="background-color: transparent; padding: 5px 20px ; text-align: center;">Phone</th>
          </tr>
          </thead>
          <tbody>
          ${participants
            .map(
              (participant: any, index: number) =>
                `<tr key=${index}>
                  <td style=" padding:5px 20px; text-align: center;">${participant.name}</td>
                  <td style=" padding: 5px 20px; text-align: center;"><a href="tel: ${participant.phone}">${participant.phone}</a></td>
              </tr>`,
            )
            .join("")}
          </tbody>
      </table>
      
        </div>`
      }
      </div>
 
      <p style="font-size:1.4rem; color:#ffffff">For more details regarding ${eventName}, Feel free to Contact Coordinators :</p>
      ${
        rolesData?.length > 0 &&
        rolesData
          .map(
            (role: any, index: number) =>
              `<li key=${index} style="font-size:1.2rem ; color:#ffffff">
            <strong>${role.name} : <a href="tel: ${role.phone}" style="color:#008000 ; font-size:1.5rem; letter-spacing:1px">${role.phone}</a></strong>
          </li>`,
          )
          .join("")
      }
      <br>
     <div style="width:80%">
     <strong style="font-size:1.2rem ; color:#ffffff">
     <span style="color:#FF0000 ; font-size:1.4rem;  letter-spacing:2px">Please note that your registration is currently under verification. Your verification will be verified within 2 days.</span> We kindly ask for your patience and understanding as our team ensures the smooth processing of all registrations. If you have any urgent inquiries, feel free to reach out to us at <a href="mailto: regalia.rcciit.official@gmail.com" style="color:#c9a747; letter-spacing:3px ; font-size:1.5rem; font-weight:600">regalia.rcciit.official@gmail.com</a>.
   </strong>
   <br>
   <p style="font-size:1.4rem; color:#ffffff">
     Thank you once again for choosing to be a part of the <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong>. We wish you the best of luck, and we can't wait to see you showcase your talents!
   </p>
   <p  style="letter-spacing:2px; color: #fffff ; font-size:1.5rem">Follow us :</p>
   <div style="display: flex; justify-content: start; gap:50px ; align-items: center; margin-top: 20px; width:100%">
   <a target="_blank" href="https://www.instagram.com/regalia_rcciit/" style="margin-right: 20px; display:flex; flex-direction:column ; align-items:center"><img src="https://i.postimg.cc/DwLzVwLQ/insta.png" alt="Instagram" style="width: 50px; height: 50px;"></a>
   <a target="_blank" href="https://www.regalia.rcciit.in/" style="margin-right: 20px; display:flex; flex-direction:column ; align-items:center"><img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-globe-icon-png-image_855070.jpg" alt="Facebook" style="width: 50px; height: 50px;"></a>
   <a target="_blank" href="https://rcciit.org.in/" style="display:flex; flex-direction:column ; align-items:center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Mr3yP27qjYesvFvbyOq0gcCrVu70ePAKr01KlyOjAQ&s" alt="Website" style="width: 50px; height: 50px;"></a>
 </div>
   <p style="letter-spacing:2px ; margin-top:5px; font-size:1.5rem ; color:#ffffff">Warm regards,</p>
   <p  style="letter-spacing:2px; color: #c9a747 ; font-size:1.5rem">Regalia 2024</p>
     </div>
  
    </div>
</div>

   `;
};
