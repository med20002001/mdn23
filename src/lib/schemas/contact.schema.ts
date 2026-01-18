import { z } from 'zod';

export const contactFormSchema = z.object({
    nom: z
    .string()
    .min(2, { message: 'Veuillez saisir votre nom.' })
    .max(30, { message: 'Le nom ne peut pas dépasser 30 caractères.' }),

  email: z
    .string()
    .min(1, { message: 'Veuillez saisir votre adresse email.' })
    .email({ message: 'Veuillez saisir une adresse email valide.' }),

  sujet: z
    .string()
    .min(3, { message: 'Veuillez préciser le sujet de votre message.' })
    .max(100, { message: 'Le sujet ne peut pas dépasser 100 caractères.' }),

  message: z
    .string()
    .min(10, { message: 'Veuillez écrire un message plus détaillé.' })
    .max(1000, { message: 'Le message ne peut pas dépasser 1 000 caractères.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
