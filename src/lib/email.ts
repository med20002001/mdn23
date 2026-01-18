import { Resend } from "resend";

type ContactEmailData = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_ADMIN: string;
};

export async function sendContactEmails({
  nom,
  email,
  sujet,
  message,
  RESEND_API_KEY,
  EMAIL_FROM,
  EMAIL_ADMIN,
}: ContactEmailData) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquante");
  }

  const resend = new Resend(RESEND_API_KEY);

  await resend.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_ADMIN],
    replyTo: email,
    subject: `[MDN23] Nouveau message : ${sujet}`,
    html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f5f7fa; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:24px;">
      <h2 style="margin:0 0 16px; color:#1f2937; font-size:20px;">
          Nouveau message de contact
      </h2>

      <table style="width:100%; border-collapse:collapse; font-size:14px; color:#374151;">
        <tr>
          <td style="padding:8px 0; font-weight:bold;">Nom :</td>
          <td style="padding:8px 0;">${nom}</td>
        </tr>
        <tr>
          <td style="padding:8px 0; font-weight:bold;">Email :</td>
          <td style="padding:8px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0; font-weight:bold;">Sujet :</td>
          <td style="padding:8px 0;">${sujet}</td>
        </tr>
      </table>

      <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="font-weight:bold; margin-bottom:8px; color:#111827;">
        Message :
      </p>
      <p style="margin:0; line-height:1.6; color:#374151; white-space:pre-line;">
        ${message}
      </p>
    </div>
  </div>
`,
  });

  await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    subject: "Confirmation – MDN23",
    html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f5f7fa; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:24px; text-align:center;">
      <h2 style="margin-bottom:16px; color:#1f2937;">
         Message bien reçu
      </h2>

      <p style="font-size:15px; color:#374151; line-height:1.6;">
        Bonjour <strong>${nom}</strong>,<br /><br />
        Nous avons bien reçu votre message concernant :
        <strong>${sujet}</strong>.
      </p>

      <p style="font-size:15px; color:#374151; line-height:1.6;">
        Notre équipe vous répondra dans les plus brefs délais.
      </p>

      <div style="margin-top:24px;">
        <p style="font-size:14px; color:#6b7280;">
           <strong>MDN23</strong>
        </p>
      </div>
    </div>


  </div>
`,
  });
}
