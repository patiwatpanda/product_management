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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">เพิ่มหมวดหมู่ใหม่</h1>
            <p class="text-gray-500 mt-1">กรอกข้อมูลหมวดหมู่ใหม่</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-4xl mx-auto">
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">ข้อมูลหมวดหมู่</h3>
              </div>
              <p class="text-gray-600">กรอกข้อมูลพื้นฐานของหมวดหมู่</p>
            </div>
            <div class="mt-6 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6">
                <!-- Category Name -->
                <div class="col-span-6">
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่อหมวดหมู่ <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    id="name"
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.name,
                    }"
                    placeholder="กรอกชื่อหมวดหมู่"
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
                    class="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 resize-none"
                    :class="{
                      'border-red-300 focus:ring-red-200 focus:border-red-500': errors.description,
                    }"
                    placeholder="กรอกคำอธิบายหมวดหมู่ (ไม่บังคับ)"
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
            to="/categories"
            class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
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
            {{ loading ? 'กำลังบันทึก...' : 'บันทึกหมวดหมู่' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '../stores/category'
import type { CategoryFormData } from '../stores/category'

const router = useRouter()
const categoryStore = useCategoryStore()

// Form data
const form = reactive<CategoryFormData>({
  name: '',
  description: '',
})

// Validation errors
const errors = reactive<Partial<Record<keyof CategoryFormData, string>>>({})

// Loading and error states
const { loading, error } = categoryStore

// Validation rules
const validateForm = (): boolean => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof CategoryFormData]
  })

  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'กรุณากรอกชื่อหมวดหมู่'
    isValid = false
  } else if (form.name.trim().length < 3) {
    errors.name = 'ชื่อหมวดหมู่ต้องมีอย่างน้อย 3 ตัวอักษร'
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
    await categoryStore.createCategory({
      ...form,
      name: form.name.trim(),
      description: form.description.trim() || '',
    })

    // Redirect to categories list
    router.push('/categories')
  } catch (error) {
    console.error('Create category failed:', error)
  }
}
</script>
