import { Resend } from "resend";

type ContactEmailData = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
};
if (typeof process === "undefined") {
  throw new Error("sendContactEmails doit être exécuté côté serveur uniquement");
}

export async function sendContactEmails({
  nom,
  email,
  sujet,
  message,
}: ContactEmailData) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM;
  const EMAIL_ADMIN = process.env.EMAIL_ADMIN;

  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquante");
  }

  if (!EMAIL_FROM || !EMAIL_ADMIN) {
    throw new Error("EMAIL_FROM ou EMAIL_ADMIN manquant");
  }

  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_ADMIN],
    replyTo: email,
    subject: `[MDN23] ${sujet}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${sujet}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p style="font-size:12px;color:#666">
        MDN23 - Moroccan Diaspora Networking 23
      </p>
    `,
  });

  await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    subject: "Confirmation de réception - MDN23",
    html: `
      <p>Bonjour ${nom},</p>
      <p>
        Nous avons bien reçu votre message concernant
        <strong>${sujet}</strong>.
      </p>
      <p>
        Notre équipe vous répondra dans les plus brefs délais.
      </p>
      <p>
        Cordialement,<br />
        <strong>L’équipe MDN23</strong>
      </p>
      <p style="font-size:12px;color:#666">
        Moroccan Diaspora Networking 23
      </p>
    `,
  });

  return { success: true };
}
