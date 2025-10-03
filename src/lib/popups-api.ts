import api from './api'

// Types for Popups API
export interface Popup {
  _id: string
  title: string
  imageUrl: string
  url?: string
  description?: string
  buttonText?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Request types
export interface CreatePopupRequest {
  title: string
  imageUrl: string
  url?: string
  description?: string
  buttonText?: string
  isActive?: boolean
}

export interface UpdatePopupRequest {
  title?: string
  imageUrl?: string
  url?: string
  description?: string
  buttonText?: string
  isActive?: boolean
}

// Response types
export interface PopupsListResponse {
  data: Popup[]
}

export interface PopupResponse {
  message: string
  data: Popup
}

export interface DeleteResponse {
  message: string
}

export interface FileUploadResponse {
  message: string
  data: {
    url: string
  }
}

// Popups API functions
export const popupsApi = {
  // List all popups
  list: async (): Promise<Popup[]> => {
    const response = await api.get<PopupsListResponse>('/v1/popups')
    return response.data.data
  },

  // Get specific popup
  get: async (id: string): Promise<Popup> => {
    const response = await api.get<PopupResponse>(`/v1/popups/${id}`)
    return response.data.data
  },

  // Create new popup
  create: async (data: CreatePopupRequest): Promise<Popup> => {
    const response = await api.post<PopupResponse>('/v1/popups', data)
    return response.data.data
  },

  // Update popup
  update: async (id: string, data: UpdatePopupRequest): Promise<Popup> => {
    const response = await api.put<PopupResponse>(`/v1/popups/${id}`, data)
    return response.data.data
  },

  // Delete popup
  delete: async (id: string): Promise<void> => {
    await api.delete<DeleteResponse>(`/v1/popups/${id}`)
  },

  // Upload image to temp storage
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post<FileUploadResponse>('/v1/file-upload/temp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data.url
  },
}