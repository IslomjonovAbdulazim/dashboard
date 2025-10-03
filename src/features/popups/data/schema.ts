import { z } from 'zod'

// Popup Schema for form validation
export const popupSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  imageUrl: z.string().min(1, 'Image is required').url('Must be a valid URL'),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  isActive: z.boolean(),
})

export type PopupFormData = z.infer<typeof popupSchema>

// Table filter schema
export const popupFilterSchema = z.object({
  isActive: z.boolean().optional(),
})

export type PopupFilterData = z.infer<typeof popupFilterSchema>