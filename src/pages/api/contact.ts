import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nom, email, sujet, message } = data;

    if (!nom || !email || !sujet || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Tous les champs sont requis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email 1: Notification admin
    await resend.emails.send({
      from: 'MDN23 Contact <onboarding@resend.dev>', // Utilise ton domaine vérifié
      to: 'mohamed1berkaoui@gmail.com',
      subject: `[MDN23] Nouveau message: ${sujet}`,
      html: `
        <h2>Nouveau message de contact MDN23</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${sujet}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Email 2: Confirmation utilisateur
    await resend.emails.send({
      from: 'MDN23 <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmation de réception - MDN23',
      html: `
        <h2>Bonjour ${nom},</h2>
        <p>Nous avons bien reçu votre message concernant "<strong>${sujet}</strong>".</p>
        <p>Notre équipe vous répondra dans les plus brefs délais.</p>
        <br>
        <p>Cordialement,</p>
        <p><strong>L'équipe MDN23</strong></p>
        <p>Moroccan Diaspora Networking 23</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Message envoyé!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erreur lors de l\'envoi.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
