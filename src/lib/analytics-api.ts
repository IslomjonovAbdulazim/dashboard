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

// Analytics API functions
export const analyticsApi = {
  // Get analytics overview for a specific date
  getOverview: async (date: string): Promise<AnalyticsOverviewResponse> => {
    const response = await api.get<AnalyticsOverviewResponse>(
      `/v1/analytics/overview?date=${date}`
    )
    return response.data
  },
}