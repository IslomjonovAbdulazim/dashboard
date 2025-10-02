import api from './api'

// Types for Analytics API
export interface AnalyticsOverviewResponse {
  message: string
  data: {
    dau: number
    wau: number
    mau: number
    premiumUsers: number
    dailyNewPremiumUsers: number
    dailyNewUsers: number
    date: string
  }
}

export interface PremiumUser {
  _id?: string
  userId: string
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  email?: string | null
  phone?: string | null
  subscriptionStartDate: string
}

export interface NewPremiumUsersResponse {
  message: string
  data: {
    results: Array<{
      date: string
      count: number
      users: PremiumUser[]
    }>
    pagination?: {
      total: number
      limit: number
      skip: number
      hasMore: boolean
    }
  }
}

export interface SingleDatePremiumUsersResponse {
  message?: string
  data: {
    date: string
    count: number
    users: PremiumUser[]
  }
}

export interface Order {
  _id?: string
  orderId: string
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  email?: string | null
  phone?: string | null
  date: string
  amount: number
  paidAmount: number
  status: 'PENDING' | 'PAID' | 'CANCELED' | 'TIMEOUT' | 'EXPIRED'
  provider: 'PAYME' | 'CLICK' | string
  promoCode?: string | null
  discountAmount: number
  discountType?: 'PERCENTAGE' | 'FIXED' | string
  subscription: string
  performedAt?: string
  canceledAt?: string | null
  displayName: string
  hasPromo: boolean
  daysSinceOrder: number
}

export interface OrdersResponse {
  message: string
  data: {
    orders: Order[]
    total: number
    pagination: {
      limit: number
      skip: number
      hasMore: boolean
    }
    summary: {
      totalRevenue: number
      averageOrderValue: number
      conversionRate: number
      statusBreakdown: Record<string, number>
      providerBreakdown: Record<string, number>
    }
    filters: {
      status: string
      paymentProvider: string
      hasPromoCode: string
      dateRange: {
        startDate: string
        endDate: string
      }
      search: string | null
    }
  }
}

export interface OrdersParams {
  status?: string
  startDate?: string
  endDate?: string
  limit?: number
  skip?: number
}

export interface PremiumUsersParams {
  startDate: string
  endDate: string
  limit?: number
  skip?: number
}

// Analytics API functions
export const analyticsApi = {
  // Get analytics overview for a specific date
  getOverview: async (date: string): Promise<AnalyticsOverviewResponse> => {
    const response = await api.get<AnalyticsOverviewResponse>(
      `/v1/analytics/overview?date=${date}`
    )
    return response.data
  },

  // Get new premium users in date range
  getNewPremiumUsers: async (params: PremiumUsersParams): Promise<NewPremiumUsersResponse> => {
    const searchParams = new URLSearchParams()
    
    searchParams.set('startDate', params.startDate)
    searchParams.set('endDate', params.endDate)
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.skip) searchParams.set('skip', params.skip.toString())

    const response = await api.get<NewPremiumUsersResponse>(
      `/v1/analytics/new-premium-users-range?${searchParams.toString()}`
    )
    return response.data
  },

  // Get new premium users for a specific date
  getNewPremiumUsersByDate: async (date: string): Promise<SingleDatePremiumUsersResponse> => {
    const response = await api.get<SingleDatePremiumUsersResponse>(
      `/v1/analytics/new-premium-users?date=${date}`
    )
    return response.data
  },

  // Get comprehensive order data
  getOrders: async (params: OrdersParams = {}): Promise<OrdersResponse> => {
    const searchParams = new URLSearchParams()
    
    if (params.status) searchParams.set('status', params.status)
    if (params.startDate) searchParams.set('startDate', params.startDate)
    if (params.endDate) searchParams.set('endDate', params.endDate)
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.skip) searchParams.set('skip', params.skip.toString())

    const response = await api.get<OrdersResponse>(
      `/v1/analytics/orders/comprehensive?${searchParams.toString()}`
    )
    return response.data
  },
}