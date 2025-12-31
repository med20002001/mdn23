import type { Handler } from "@netlify/functions";
import { contactFormSchema } from "../../src/lib/schemas/contact.schema";
import { sendContactEmails } from "../../src/lib/email";

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: "Méthode non autorisée" })
      };
    }

    const contentType = event.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Content-Type doit être application/json"
        })
      };
    }

    const data = JSON.parse(event.body || "{}");
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstError =
        Object.values(errors)[0]?.[0] || "Données invalides";

      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: firstError
        })
      };
    }

    const { nom, email, sujet, message } = validation.data;

    console.log("✅ RESEND VERSION LOADED");
    try {
      await sendContactEmails({ nom, email, sujet, message });

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message:
            "Message envoyé avec succès ! Un email de confirmation vous a été envoyé."
        })
      };
    } catch (emailError) {
      const errorMessage =
        emailError instanceof Error
          ? emailError.message
          : "Erreur inconnue";

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: `Erreur lors de l'envoi: ${errorMessage}. Veuillez réessayer.`
        })
      };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erreur serveur inconnue";

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: `Erreur serveur: ${errorMessage}. Veuillez réessayer plus tard.`
      })
    };
  }
};
