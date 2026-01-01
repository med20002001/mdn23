import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact.schema";
import { contactFields } from "./contact.fields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error();
      const result = (await response.json()) as ApiResponse;
      setStatus({
        type: result.success ? "success" : "error",
        message:
          result.message ??
          (result.success
            ? "Message envoyé avec succès."
            : "Une erreur est survenue."),
      });
      if (result.success) form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Impossible de contacter le serveur.",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {contactFields.map((field) => (
          <FormFieldControl<ContactFormData>
            key={field.name}
            control={form.control}
            {...field}
          />
        ))}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-green-500 text-white"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : ("Envoyer")}
        </Button>
        {status.type && (
          <div className="border p-4 rounded flex items-center gap-2">
            {status.type === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span>{status.message}</span>
          </div>
        )}
      </form>
    </Form>
  );
}
