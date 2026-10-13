'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactSchema } from '@/lib/form-validation'
import { Button } from '@/components/ui/Button'


type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit form.')
      }

      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 6000)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-2xl font-heading font-semibold text-dark mb-6">Send us a Message</h3>
      
      {isSuccess && (
        <div role="status" className="bg-green-50 text-green-800 p-4 rounded-md mb-6 border border-green-200">
          Thank you for reaching out! Your message has been saved and we&apos;ll get back to you shortly.
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="bg-red-50 text-red-800 p-4 rounded-md mb-6 border border-red-200">
          {errorMessage}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
            <input
              id="name"
              autoComplete="name"
              maxLength={100}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
            <input
              id="email"
              autoComplete="email"
              maxLength={150}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="john@example.com"
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              id="phone"
              autoComplete="tel"
              maxLength={30}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
            <input
              id="subject"
              autoComplete="off"
              maxLength={200}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              type="text"
              {...register('subject')}
              className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="How can we help?"
            />
            {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <textarea
            id="message"
              autoComplete="off"
              maxLength={3000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            rows={5}
            {...register('message')}
            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tell us about your requirements..."
          ></textarea>
          {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" tabIndex={-1} autoComplete="off" {...register('hp_field')} /></div>
        <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
