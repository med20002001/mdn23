import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact.schema";
import { contactFields } from "./contact.fields";
import { Form } from "@/components/ui/form";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { FormFieldControl } from "./FormFieldControl";

type ApiResponse = {
  success: boolean;
  message?: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nom: "",
      email: "",
      sujet: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(result.message || "Erreur serveur");
      }

      setStatus({
        type: result.success ? "success" : "error",
        message:
          result.message ??
          (result.success
            ? "Merci pour votre confiance. Nous avons bien reçu votre message."
            : "Une erreur est survenue."),
      });

      if (result.success) {
        form.reset();
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible de contacter le serveur.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10"
      >
        {/* Champs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {contactFields.slice(0, 2).map((field) => (
            <FormFieldControl<ContactFormData>
              key={field.name}
              control={form.control}
              {...field}
            />
          ))}
        </div>

        {contactFields.slice(2).map((field) => (
          <FormFieldControl<ContactFormData>
            key={field.name}
            control={form.control}
            {...field}
          />
        ))}

        {/* Bouton premium */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="
              group w-full py-6 px-10 rounded-2xl
              bg-gray-900 text-white
              font-bold uppercase text-[10px] tracking-[0.4em]
              transition-all duration-500
              hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-200
              active:scale-[0.98]
              disabled:opacity-50
            "
          >
            <div className="flex items-center justify-center gap-4">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Envoyer le message</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </div>
          </button>
        </div>

        {/* Status */}
        {status.type && (
          <div
            className={`
              p-6 rounded-2xl flex items-center gap-5
              animate-slideIn border transition-all duration-500
              ${
                status.type === "success"
                  ? "bg-gray-50 border-gray-100 text-gray-900"
                  : "bg-red-50 border-red-100 text-red-600"
              }
            `}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-gray-900" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <p className="text-xs font-medium tracking-wide">
              {status.message}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
