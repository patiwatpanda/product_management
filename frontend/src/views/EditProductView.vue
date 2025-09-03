<template>
  <div class="px-4 sm:px-0">
    <!-- Header -->
    <div class="sm:flex sm:items-center mb-8">
      <div class="sm:flex-auto">
        <div class="flex items-center space-x-3 mb-2">
          <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">แก้ไขสินค้า</h1>
            <p class="text-gray-500 mt-1">แก้ไขข้อมูลสินค้า</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !product" class="flex justify-center items-center py-12">
      <div class="relative">
        <div
          class="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-gray-600 rounded-full animate-spin"
          style="animation-delay: 0.5s"
        ></div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="text-center py-12">
      <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบข้อมูลสินค้า</h3>
      <p class="text-gray-500 mb-6">สินค้าที่คุณกำลังมองหาอาจถูกลบหรือไม่ปรากฏในระบบ</p>
      <router-link
        to="/products"
        class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        กลับไปยังรายการสินค้า
      </router-link>
    </div>

    <!-- Form -->
    <div v-else class="max-w-4xl mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div class="md:grid md:grid-cols-3 md:gap-8">
            <div class="md:col-span-1">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">ข้อมูลสินค้า</h3>
              </div>
              <p class="text-gray-600">แก้ไขข้อมูลพื้นฐานของสินค้า</p>
            </div>
            <div class="mt-6 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6">
                <!-- Product Name -->
                <div class="col-span-6">
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่อสินค้า <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    id="name"
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.name,
                    }"
                    placeholder="กรอกชื่อสินค้า"
                  />
                  <p v-if="errors.name" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Description -->
                <div class="col-span-6">
                  <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                    คำอธิบาย
                  </label>
                  <textarea
                    v-model="form.description"
                    name="description"
                    id="description"
                    rows="4"
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.description,
                    }"
                    placeholder="กรอกคำอธิบายสินค้า (ไม่บังคับ)"
                  ></textarea>
                  <p v-if="errors.description" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.description }}
                  </p>
                </div>

                <!-- Category -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="categoryId" class="block text-sm font-semibold text-gray-700 mb-2">
                    หมวดหมู่ <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.categoryId"
                    name="categoryId"
                    id="categoryId"
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.categoryId,
                    }"
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    <option
                      v-for="category in categories"
                      :key="category._id"
                      :value="category._id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <p v-if="errors.categoryId" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.categoryId }}
                  </p>
                </div>

                <!-- Price -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="price" class="block text-sm font-semibold text-gray-700 mb-2">
                    ราคา (บาท) <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500 text-sm">฿</span>
                    </div>
                    <input
                      v-model.number="form.price"
                      type="number"
                      name="price"
                      id="price"
                      min="0"
                      step="0.01"
                      class="block w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      :class="{
                        'border-red-300 focus:ring-red-200 focus:border-red-500': errors.price,
                      }"
                      placeholder="0.00"
                    />
                  </div>
                  <p v-if="errors.price" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.price }}
                  </p>
                </div>

                <!-- Stock -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="stock" class="block text-sm font-semibold text-gray-700 mb-2">
                    จำนวนสต็อก
                  </label>
                  <input
                    v-model.number="form.stock"
                    type="number"
                    name="stock"
                    id="stock"
                    min="0"
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.stock,
                    }"
                    placeholder="0"
                  />
                  <p v-if="errors.stock" class="mt-2 text-sm text-red-600 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.stock }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="rounded-lg bg-red-50 p-6 border border-red-200 shadow-sm">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-semibold text-red-800">เกิดข้อผิดพลาด</h3>
              <div class="mt-1 text-sm text-red-700">
                <p>{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4">
          <router-link
            to="/products"
            class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            ยกเลิก
          </router-link>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <div
              v-if="loading"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {{ loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useCategoryStore } from '../stores/category'
import type { ProductFormData, Product } from '../stores/product'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

// Props
const props = defineProps<{
  id: string
}>()

// Form data
const form = reactive<ProductFormData>({
  name: '',
  description: '',
  price: 0,
  categoryId: '',
  stock: 0,
})

// Validation errors
const errors = reactive<Partial<Record<keyof ProductFormData, string>>>({})

// Loading and error states
const { loading, error } = productStore
const { categories } = categoryStore

// Product data
const product = ref<Product | null>(null)
console.log(product, 'productedit')
// Load product data
const loadProduct = async () => {
  try {
    const productData = await productStore.fetchProductById(props.id)
    product.value = productData as Product

    // Populate form with product data
    form.name = (productData as Product).name
    form.description = ((productData as Product).description as string) || ''
    form.price = (productData as Product).price as number
    form.categoryId = (productData as Product).categoryId._id as string
    form.stock = (productData as Product).stock as number
  } catch (error) {
    console.error('Failed to load product:', error)
  }
}

// Validation rules
const validateForm = (): boolean => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof ProductFormData]
  })

  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'กรุณากรอกชื่อสินค้า'
    isValid = false
  } else if (form.name.trim().length < 3) {
    errors.name = 'ชื่อสินค้าต้องมีอย่างน้อย 3 ตัวอักษร'
    isValid = false
  }

  // Category validation
  if (!form.categoryId) {
    errors.categoryId = 'กรุณาเลือกหมวดหมู่'
    isValid = false
  }

  // Price validation
  if (!form.price || form.price <= 0) {
    errors.price = 'กรุณากรอกราคาที่มากกว่า 0'
    isValid = false
  }

  // Stock validation (optional but must be non-negative)
  if (form.stock < 0) {
    errors.stock = 'จำนวนสต็อกต้องไม่เป็นจำนวนลบ'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    await productStore.updateProduct(props.id, {
      ...form,
      name: form.name.trim(),
      description: form.description.trim() || undefined,
    })

    // Redirect to products list
    router.push('/products')
  } catch (error) {
    console.error('Update product failed:', error)
  }
}

// Watch for route changes
watch(
  () => props.id,
  () => {
    if (props.id) {
      loadProduct()
    }
  },
  { immediate: true },
)

// Load categories on mount
onMounted(async () => {
  await Promise.all([categoryStore.fetchCategories(), loadProduct()])
})
</script>

