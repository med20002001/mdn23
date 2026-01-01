import type { APIRoute } from "astro";
import { contactFormSchema } from "../../lib/schemas/contact.schema";
import { sendContactEmails } from "../../lib/email";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // ✅ SOLUTION ROBUSTE (ignore le typage Astro cassé)
    const env = (locals as any).runtime.env;

    const RESEND_API_KEY = env.RESEND_API_KEY;
    const EMAIL_FROM = env.EMAIL_FROM;
    const EMAIL_ADMIN = env.EMAIL_ADMIN;

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY manquante");
    }
    if (!EMAIL_FROM || !EMAIL_ADMIN) {
      throw new Error("EMAIL_FROM ou EMAIL_ADMIN manquant");
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Content-Type doit être application/json",
        }),
        { status: 400 }
      );
    }

    const data = await request.json();
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
      const firstError =
        Object.values(validation.error.flatten().fieldErrors)[0]?.[0] ??
        "Données invalides";

      return new Response(
        JSON.stringify({ success: false, message: firstError }),
        { status: 400 }
      );
    }

    const { nom, email, sujet, message } = validation.data;

    await sendContactEmails({
      nom,
      email,
      sujet,
      message,
      RESEND_API_KEY,
      EMAIL_FROM,
      EMAIL_ADMIN,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Message envoyé avec succès ! Un email de confirmation vous a été envoyé.",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error
            ? `Erreur serveur: ${error.message}`
            : "Erreur serveur inconnue",
      }),
      { status: 500 }
    );
  }
};
