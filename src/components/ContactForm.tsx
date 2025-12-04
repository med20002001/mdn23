import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '../lib/schemas/contact.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nom: '',
      email: '',
      sujet: '',
      message: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Message envoyé avec succès! Un email de confirmation vous a été envoyé.',
        });
        form.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Une erreur est survenue.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Impossible de contacter le serveur. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Nom */}
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Nom complet <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    {...field}
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Sujet */}
          <FormField
            control={form.control}
            name="sujet"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Sujet <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sujet"
                    {...field}
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tapez le texte de votre message"
                    rows={5}
                    {...field}
                    required
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Bouton Envoyer */}
          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer'
              )}
            </Button>
          </div>

          {/* Message de statut - Design simple sans couleur */}
          {submitStatus.type && (
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {submitStatus.type === 'success' ? 'Message envoyé' : 'Erreur'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
