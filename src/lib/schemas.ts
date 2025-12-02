import { z } from 'zod';

export const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer un email valide'),
  telephone: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères')
});
