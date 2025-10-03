import { z } from 'zod'

// Coupon Schema for form validation
export const couponSchema = z.object({
  code: z.string().min(1, 'Code is required').max(50, 'Code must be less than 50 characters'),
  userCommissionValue: z.number().min(0, 'Commission value must be positive'),
  userCommissionType: z.enum(['fixed', 'percentage']),
  userDiscountValue: z.number().min(0, 'Discount value must be positive'),
  userDiscountType: z.enum(['fixed', 'percentage']),
  applicableSubscriptions: z.array(z.string()).optional(),
  expirationDate: z.string().min(1, 'Expiration date is required'),
  isActive: z.boolean(),
  maxUsage: z.number().min(1, 'Max usage must be at least 1'),
})

export type CouponFormData = z.infer<typeof couponSchema>

// Table filter schema
export const couponFilterSchema = z.object({
  isActive: z.boolean().optional(),
  userCommissionType: z.enum(['fixed', 'percentage']).optional(),
  userDiscountType: z.enum(['fixed', 'percentage']).optional(),
})

export type CouponFilterData = z.infer<typeof couponFilterSchema>