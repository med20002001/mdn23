import { z } from 'zod';

export const contactFormSchema = z.object({
  nom: z
    .string()
    .min(2, { message: 'Please fill in this field' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères' }),
  email: z
    .string()
    .email({ message: 'Please fill in this field' })
    .min(1, { message: 'L\'email est requis' }),
  sujet: z
    .string()
    .min(3, { message: 'Please fill in this field' })
    .max(100, { message: 'Le sujet ne peut pas dépasser 100 caractères' }),
  message: z
    .string()
    .min(10, { message: 'Please fill in this field' })
    .max(1000, { message: 'Le message ne peut pas dépasser 1000 caractères' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
