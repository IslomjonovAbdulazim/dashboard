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
    date: string
  }
}

export interface PremiumUser {
  _id: string
  userId: string
  firstName?: string
  email?: string
  phone?: string
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
  }
}

export interface Order {
  _id: string
  discountAmount: number
  status: 'PENDING' | 'PAID' | 'CANCELED' | 'TIMEOUT' | 'EXPIRED'
  orderId: string
  email?: string
  date: string
  amount: number
  paidAmount: number
  provider: 'PAYME' | string
  subscription: string
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
  getNewPremiumUsers: async (startDate: string, endDate: string): Promise<NewPremiumUsersResponse> => {
    const response = await api.get<NewPremiumUsersResponse>(
      `/v1/analytics/new-premium-users-range?startDate=${startDate}&endDate=${endDate}`
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