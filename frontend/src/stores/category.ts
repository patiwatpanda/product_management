import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { categoryApi } from '../services/api'

export interface Category {
  _id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: string
  description: string
}

export const useCategoryStore = defineStore('category', () => {
  // State
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })

  // Getters
  const getCategoryById = computed(() => {
    return (id: string) => categories.value.find(category => category._id === id)
  })

  // Actions
  const fetchCategories = async (params?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryApi.getAll(params)
      if (response.success && response.data) {
        categories.value = response.data as Category[]
        if (response.pagination) {
          pagination.value = response.pagination
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูลหมวดหมู่'
    } finally {
      loading.value = false
    }
  }

  const fetchCategoryById = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryApi.getById(id)
      if (response.success && response.data) {
        return response.data
      }
      throw new Error('ไม่พบข้อมูลหมวดหมู่')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูลหมวดหมู่'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (categoryData: CategoryFormData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryApi.create(categoryData)
      if (response.success && response.data) {
        categories.value.unshift(response.data as Category)
        return response.data
      }
      throw new Error('ไม่สามารถสร้างหมวดหมู่ได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการสร้างหมวดหมู่'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id: string, categoryData: Partial<CategoryFormData>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryApi.update(id, categoryData)
      if (response.success && response.data) {
        const index = categories.value.findIndex(category => category._id === id)
        if (index !== -1) {
          categories.value[index] = response.data as Category
        }
        return response.data
      }
      throw new Error('ไม่สามารถอัปเดตหมวดหมู่ได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryApi.delete(id)
      if (response.success) {
        categories.value = categories.value.filter(category => category._id !== id)
        return true
      }
      throw new Error('ไม่สามารถลบหมวดหมู่ได้')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบหมวดหมู่'
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
    categories,
    loading,
    error,
    pagination,
    
    // Getters
    getCategoryById,
    
    // Actions
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError
  }
})
