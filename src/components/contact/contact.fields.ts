import type { ContactFormData } from "@/lib/schemas/contact.schema";

export type ContactFieldConfig = {
  name: keyof ContactFormData;
  label: string;
  type?: "text" | "email";
  as?: "input" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  autoComplete?: string;
};

export const contactFields: ContactFieldConfig[] = [
  {
    name: "nom",
    label: "Nom complet",
    placeholder: "Votre nom",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@gmail.com",
    autoComplete: "email",
    required: true,
  },
  
  {
    name: "sujet",
    label: "Sujet",
    placeholder: "Sujet",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    as: "textarea",
    placeholder: "Tapez le texte de votre message",
    rows: 5,
    required: true,
  },
  
];
