export const registrationConfirmationEmail = (eventName:string, inputs:any, participants:any) => {
    return `
        <div class="container">
          <h2>Registration Confirmation for ${eventName} in Regalia 2024</h2>
          <p>
            Dear ${inputs.teamLeadName},
          </p>
          <p>
            We are delighted to inform you that your registration for the <strong>${eventName}</strong> has been successfully received. Your enthusiasm for participation is truly appreciated, and we're looking forward to an exciting event ahead!
          </p>
          <h3>Registration Details:</h3>
          <ul>
            <li><strong>Team Name:</strong> ${inputs.teamName}</li>
            <li><strong>Team Leader Name:</strong> ${inputs.teamLeadName}</li>
            <li><strong>Phone:</strong> ${inputs.teamLeadPhone}</li>
            <li><strong>Email:</strong> ${inputs.teamLeadEmail}</li>
          </ul>
          ${participants?.length > 0 && `<h3>Team Members:</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
            ${participants.map((participant:any) => `
              <tr>
                <td>${participant.name}</td>
                <td>${participant.phone}</td>
              </tr>
            `).join('')}
          </table>`}
          <p>
            Please note that your registration is currently under verification. We kindly ask for your patience and understanding as our team ensures the smooth processing of all registrations. If you have any urgent inquiries, feel free to reach out to us at [Contact Email/Phone].
          </p>
          <p>
            Thank you once again for choosing to be a part of the <strong>[Event Name]</strong>. We wish you the best of luck, and we can't wait to see you showcase your talents!
          </p>
          <p>Warm regards,</p>
          <p>Regalia 2024</p>
        </div>

    `;
  }
  