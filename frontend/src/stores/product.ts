import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productApi } from '../services/api'

export interface Product {
  _id: string
  name: string
  description?: string
  price: number
  categoryId: {
    _id: string
    name: string
    description?: string
  }
  stock: number
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
}

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  // Getters
  const getProductById = computed(() => {
    return (id: string) => products.value.find((product) => product._id === id)
  })

  // Actions
  const fetchProducts = async (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    loading.value = true
    error.value = null

    try {
      console.log('Fetching products with params:', params)
      const response = await productApi.getAll(params)
      console.log('Full API Response:', response)
      console.log('Response type:', typeof response)
      console.log('Response keys:', Object.keys(response))
      // Check if response has data or products property, or if response is an array directly
      const responseData =
        response.data || (response as any).products || (Array.isArray(response) ? response : null)
      console.log('Response data to use:', responseData)

      if (responseData) {
        console.log('API Response data:', responseData)
        console.log('Data type:', typeof responseData)
        console.log('Data is array:', Array.isArray(responseData))

        // Ensure we have an array of products
        if (Array.isArray(responseData)) {
          products.value = responseData as Product[]
        } else {
          console.error('Response data is not an array:', responseData)
          error.value = 'ข้อมูลที่ได้รับไม่ถูกต้อง'
          return
        }

        if (response.pagination || (response as any).pagination) {
          pagination.value = response.pagination || (response as any).pagination
          console.log('Pagination updated:', pagination.value)
        } else {
          console.log('No pagination in response, using default')
          // Set default pagination if not provided
          pagination.value = {
            currentPage: 1,
            totalPages: 1,
            totalItems: products.value.length,
            itemsPerPage: 10,
          }
        }
        console.log('Products after update:', products.value)
        console.log('Final pagination state:', pagination.value)
      } else {
        console.error('API response not successful:', response)
        error.value = (response as any).message || 'ไม่ได้รับข้อมูลจากเซิร์ฟเวอร์'
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า'
      console.log('Error details:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await productApi.getById(id)
      if ((response as any).success && response.data) {
        return response.data
      }
      throw new Error('ไม่พบข้อมูลสินค้า')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า'
      console.log('Error details:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData: ProductFormData) => {
    loading.value = true
    error.value = null

    try {
      const response = await productApi.create(productData)
      if ((response as any).success && response.data) {
        products.value.unshift(response.data as Product)
        return response.data
      }
      throw new Error('ไม่สามารถสร้างสินค้าได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการสร้างสินค้า'
      console.log('Error details:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: string, productData: Partial<ProductFormData>) => {
    loading.value = true
    error.value = null

    try {
      const response = await productApi.update(id, productData)
      if ((response as any).success && response.data) {
        const index = products.value.findIndex((product) => product._id === id)
        if (index !== -1) {
          products.value[index] = response.data as Product
        }
        return response.data
      }
      throw new Error('ไม่สามารถอัปเดตสินค้าได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตสินค้า'
      console.log('Error details:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await productApi.delete(id)
      if ((response as any).success) {
        products.value = products.value.filter((product) => product._id !== id)
        return true
      }
      throw new Error('ไม่สามารถลบสินค้าได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบสินค้า'
      console.log('Error details:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    products,
    loading,
    error,
    pagination,

    // Getters
    getProductById,

    // Actions
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
  }
})
