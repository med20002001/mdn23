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
    html: `<p>${message}</p>`,
  });

  await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    subject: "Confirmation – MDN23",
    html: `<p>Message reçu</p>`,
  });
}
