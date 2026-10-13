import { z } from 'zod'
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(150),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(3000),
  hp_field: z.string().max(500).optional(),
})
export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(150),
  hp_field: z.string().max(500).optional(),
})
