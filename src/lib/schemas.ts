import { z } from 'zod';

export const contactSchema = z.object({
  nom: z.string().min(2, 'Please fill in this field'),
  email: z.string().email('Veuillez entrer un email valide'),
  telephone: z.string().optional(),
  message: z.string().min(10, 'Please fill in this field')
});
