export const registrationConfirmationEmail = (eventName:string, inputs:any, participants:any) => {
  return (
    `<div style="font-family: 'Poppins, sans-serif'; width: 100%; height:100%;
    overflow: hidden;
    background-image: url('https://i.postimg.cc/Z5D0P2yt/Regalia-Main-1280-x-568-px.png');
    background-position: top center;
    color:#ffffff;
    background-repeat: repeat; line-height: 1.6; margin: 0; padding: 20px; overflow: hidden; position: relative;  margin: auto;">
   
    <div style="color: #ffffff; width:100%">
      <h2 style="color: #c9a747; font-weight: 600; font-size: 2rem; letter-spacing:3px;">Registration Confirmation for ${eventName} in Regalia 2024</h2>
      <h4 style="font-size:1.4rem">
        Dear Team ${inputs.teamName},
      </h4>
      <p  style="font-size:1.2rem">
        We are delighted to inform you that your registration for the <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong> has been successfully received. Your enthusiasm for participation is truly appreciated, and we're looking forward to an exciting event ahead!
      </p>
     
     
     
      <h3 style="color: #ffffff; font-weight: 500; font-size:1.4rem">Registration Details :</h3>
      <ul style=" font-size:1.2rem">
        <li><strong>Team Name:</strong> ${inputs.teamName}</li>
        <li><strong>Team Leader Name:</strong> ${inputs.teamLeadName}</li>
        <li><strong>Team Leader Phone:</strong> ${inputs.teamLeadPhone}</li>
        <li><strong>Email:</strong> ${inputs.teamLeadEmail}</li>
      </ul>
      
      
      
      
    
      ${participants?.length > 0 && (
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
          ${participants.map((participant:any,index:number) => (
              `<tr key=${index}>
                  <td style=" padding:5px 20px; text-align: center;">${participant.name}</td>
                  <td style=" padding: 5px 20px; text-align: center;">${participant.phone}</td>
              </tr>`
          )).join('')}
          </tbody>
      </table>
      
        </div>`
      )}
      </div>
 
      
     
      <p style="font-size:1.2rem">
        Please note that your registration is currently under verification. Your verification will be verified within 2 days. We kindly ask for your patience and understanding as our team ensures the smooth processing of all registrations. If you have any urgent inquiries, feel free to reach out to us at [Contact Email/Phone].
      </p>
      <p style="font-size:1.2rem">
        Thank you once again for choosing to be a part of the <strong  style="letter-spacing:2px; color: #c9a747">${eventName}</strong>. We wish you the best of luck, and we can't wait to see you showcase your talents!
      </p>
      <p style="letter-spacing:2px ; font-size:1.5rem">Warm regards,</p>
      <p  style="letter-spacing:2px; color: #c9a747 ; font-size:1.5rem">Regalia 2024</p>
    </div>
</div>

   `
  );
}
