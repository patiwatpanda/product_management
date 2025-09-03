// API Service for connecting to backend
const API_BASE_URL = 'http://localhost:3003'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Product API
export const productApi = {
  // Get all products
  getAll: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString())
        }
      })
    }
    const queryString = searchParams.toString()
    console.log('API Request URL:', `/api/products/products${queryString ? `?${queryString}` : ''}`)
    return apiRequest(`/api/products/products${queryString ? `?${queryString}` : ''}`)
  },

  // Get product by ID
  getById: (id: string) => apiRequest(`/api/products/product/${id}`),

  // Create new product
  create: (productData: {
    name: string
    description?: string
    price: number
    categoryId: string
    stock?: number
  }) =>
    apiRequest('/api/products/product', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  // Update product
  update: (
    id: string,
    productData: {
      name?: string
      description?: string
      price?: number
      categoryId?: string
      stock?: number
    },
  ) =>
    apiRequest(`/api/products/product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  // Delete product
  delete: (id: string) =>
    apiRequest(`/api/products/product/${id}`, {
      method: 'DELETE',
    }),

  // Update product stock
  updateStock: (id: string, stock: number, operation: 'set' | 'add' | 'subtract' = 'set') =>
    apiRequest(`/api/products/product/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ stock, operation }),
    }),
}

// Category API
export const categoryApi = {
  // Get all categories
  getAll: (params?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    const queryString = searchParams.toString()
    return apiRequest(`/api/categories/categories${queryString ? `?${queryString}` : ''}`)
  },

  // Get category by ID
  getById: (id: string) => apiRequest(`/api/categories/category/${id}`),

  // Create new category
  create: (categoryData: { name: string; description?: string }) =>
    apiRequest('/api/categories/category', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    }),

  // Update category
  update: (
    id: string,
    categoryData: {
      name?: string
      description?: string
    },
  ) =>
    apiRequest(`/api/categories/category/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    }),

  // Delete category
  delete: (id: string) =>
    apiRequest(`/api/categories/category/${id}`, {
      method: 'DELETE',
    }),
}

export default { productApi, categoryApi }
