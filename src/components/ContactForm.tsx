import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  sujet: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setStatusMessage('✓ Message envoyé avec succès! Un email de confirmation vous a été envoyé.')
        reset()
      } else {
        setStatus('error')
        setStatusMessage(result.message || '✗ Une erreur est survenue.')
      }
    } catch (error) {
      setStatus('error')
      setStatusMessage('✗ Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-sm font-bold text-gray-900 mb-2">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          placeholder="Entrez votre nom ou le nom de votre organisation"
          {...register('nom')}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
        />
        {errors.nom && (
          <p className="mt-1 text-xs text-red-500">{errors.nom.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          {...register('email')}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="sujet" className="block text-sm font-bold text-gray-900 mb-2">
          Sujet
        </label>
        <input
          type="text"
          id="sujet"
          placeholder="Sujet"
          {...register('sujet')}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
        />
        {errors.sujet && (
          <p className="mt-1 text-xs text-red-500">{errors.sujet.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tapez l'objet de votre message"
          {...register('message')}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-y bg-white"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Message de statut */}
      {status !== 'idle' && (
        <div
          className={`text-sm py-3 px-4 rounded-md ${
            status === 'success'
              ? 'bg-green-100 text-green-800'
              : status === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {status === 'loading' ? 'Envoi en cours...' : statusMessage}
        </div>
      )}

      {/* Bouton Envoyer */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
  )
}
