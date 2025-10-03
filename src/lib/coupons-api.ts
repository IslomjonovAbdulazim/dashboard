import api from './api'

// Types for Coupons API
export interface User {
  _id: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Subscription {
  _id: string
  title: string
}

export interface Commission {
  value: number
  type: 'fixed' | 'percentage'
}

export interface Discount {
  value: number
  type: 'fixed' | 'percentage'
}

export interface Coupon {
  _id: string
  code: string
  userCommission: Commission
  userDiscount: Discount
  user: User
  applicableSubscriptions: Subscription[]
  expirationDate: string
  isActive: boolean
  maxUsage: number
  usageCount: number
}

// Request types
export interface CreateCouponRequest {
  code: string
  userCommissionValue: number
  userCommissionType: 'fixed' | 'percentage'
  userDiscountValue: number
  userDiscountType: 'fixed' | 'percentage'
  applicableSubscriptions?: string[]
  expirationDate: string
  isActive: boolean
  maxUsage: number
}

export interface UpdateCouponRequest {
  code?: string
  userCommissionValue?: number
  userCommissionType?: 'fixed' | 'percentage'
  userDiscountValue?: number
  userDiscountType?: 'fixed' | 'percentage'
  applicableSubscriptions?: string[]
  expirationDate?: string
  isActive?: boolean
  maxUsage?: number
}

// Response types
export interface CouponsListResponse {
  data: Coupon[]
}

export interface CouponResponse {
  message: string
  data: Coupon
}

export interface DeleteResponse {
  message: string
  data: Coupon
}

// Coupons API functions
export const couponsApi = {
  // List all coupons
  list: async (): Promise<Coupon[]> => {
    const response = await api.get<CouponsListResponse>('/coupons')
    return response.data.data
  },

  // Get specific coupon
  get: async (id: string): Promise<Coupon> => {
    const response = await api.get<CouponResponse>(`/coupons/${id}`)
    return response.data.data
  },

  // Create new coupon
  create: async (data: CreateCouponRequest): Promise<Coupon> => {
    const response = await api.post<CouponResponse>('/coupons', data)
    return response.data.data
  },

  // Update coupon
  update: async (id: string, data: UpdateCouponRequest): Promise<Coupon> => {
    const response = await api.put<CouponResponse>(`/coupons/${id}`, data)
    return response.data.data
  },

  // Delete coupon
  delete: async (id: string): Promise<Coupon> => {
    const response = await api.delete<DeleteResponse>(`/coupons/${id}`)
    return response.data.data
  },
}