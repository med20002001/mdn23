import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: import.meta.env.EMAIL_USER,
    pass: import.meta.env.EMAIL_PASS,
  },
});

export async function sendContactEmails(data: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}) {
  try {
    // Email 1: Notification à l'admin (Simple)
    await transporter.sendMail({
      from: `"${data.nom} via MDN23" <${import.meta.env.EMAIL_USER}>`,
      to: 'mohamed1berkaoui@gmail.com',
      replyTo: data.email,
      subject: `[MDN23] ${data.sujet}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto;">
            
            <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: normal; border-bottom: 1px solid #dddddd; padding-bottom: 10px;">
              Nouveau message de contact
            </h2>

            <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                  <strong>Nom :</strong> ${data.nom}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                  <strong>Email :</strong> <a href="mailto:${data.email}" style="color: #000000; text-decoration: underline;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                  <strong>Sujet :</strong> ${data.sujet}
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <strong>Message :</strong>
              <div style="margin-top: 10px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${data.message}</p>
              </div>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dddddd;">

            <p style="margin: 0; font-size: 12px; color: #666666;">
              MDN23 - Moroccan Diaspora Networking 23
            </p>

          </div>
        </body>
        </html>
      `,
      text: `
Nouveau message de contact

Nom: ${data.nom}
Email: ${data.email}
Sujet: ${data.sujet}

Message:
${data.message}

---
MDN23 - Moroccan Diaspora Networking 23
      `,
    });

    // Email 2: Confirmation au visiteur (Simple)
    await transporter.sendMail({
      from: `"MDN23" <${import.meta.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Confirmation de reception - MDN23',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto;">
            
            <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: normal; border-bottom: 1px solid #dddddd; padding-bottom: 10px;">
              Confirmation de reception
            </h2>

            <p style="margin: 0 0 15px 0; line-height: 1.6;">
              Bonjour ${data.nom},
            </p>

            <p style="margin: 0 0 15px 0; line-height: 1.6;">
              Nous avons bien recu votre message concernant "${data.sujet}".
            </p>

            <div style="margin: 20px 0;">
              <strong>Votre message :</strong>
              <div style="margin-top: 10px; padding: 15px; background-color: #f9f9f9; border: 1px solid #dddddd;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${data.message}</p>
              </div>
            </div>

            <p style="margin: 20px 0 0 0; line-height: 1.6;">
              Notre equipe vous repondra dans les plus brefs delais.
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dddddd;">

            <p style="margin: 0 0 5px 0;">
              Cordialement,
            </p>
            <p style="margin: 0 0 5px 0; font-weight: bold;">
              L'equipe MDN23
            </p>
            <p style="margin: 0; font-size: 12px; color: #666666;">
              Moroccan Diaspora Networking 23
            </p>

          </div>
        </body>
        </html>
      `,
      text: `
Bonjour ${data.nom},

Nous avons bien recu votre message concernant "${data.sujet}".

Votre message:
${data.message}

Notre equipe vous repondra dans les plus brefs delais.

Cordialement,
L'equipe MDN23
Moroccan Diaspora Networking 23
      `,
    });

    return { success: true };

  } catch (error) {
    console.error('Erreur dans sendContactEmails:', error);
    throw error;
  }
}
