import type { APIRoute } from "astro";
import { contactFormSchema } from "../../lib/schemas/contact.schema";
import { sendContactEmails } from "../../lib/email";

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Content-Type doit être application/json"
        }),
        { status: 400 }
      );
    }

    const data = await request.json();
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstError =
        Object.values(errors)[0]?.[0] || "Données invalides";

      return new Response(
        JSON.stringify({
          success: false,
          message: firstError
        }),
        { status: 400 }
      );
    }

    const { nom, email, sujet, message } = validation.data;

    await sendContactEmails({ nom, email, sujet, message });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Message envoyé avec succès ! Un email de confirmation vous a été envoyé."
      }),
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erreur serveur inconnue";

    return new Response(
      JSON.stringify({
        success: false,
        message: `Erreur serveur: ${errorMessage}`
      }),
      { status: 500 }
    );
  }
};
