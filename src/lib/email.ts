import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactEmailData = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
};

export async function sendContactEmails({
  nom,
  email,
  sujet,
  message,
}: ContactEmailData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY manquante');
  }
  await resend.emails.send({
    from: import.meta.env.EMAIL_FROM,
    to: [import.meta.env.EMAIL_ADMIN],
    replyTo: email,
    subject: `[MDN23] ${sujet}`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
  <h2>Nouveau message de contact</h2>
  <p><strong>Nom :</strong> ${nom}</p>
  <p><strong>Email :</strong> ${email}</p>
  <p><strong>Sujet :</strong> ${sujet}</p>
  <hr />
  <p>${message.replace(/\n/g, '<br />')}</p>
  <hr />
  <p style="font-size:12px;color:#666">
    MDN23 - Moroccan Diaspora Networking 23
  </p>
</body>
</html>
    `,
  });
  await resend.emails.send({
    from: import.meta.env.EMAIL_FROM,
    to: [email],
    subject: 'Confirmation de réception - MDN23',
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
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
</body>
</html>
    `,
  });

  return { success: true };
}
