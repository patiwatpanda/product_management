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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">จัดการหมวดหมู่</h1>
            <p class="text-gray-600 mt-1">ดูและจัดการหมวดหมู่สินค้าทั้งหมด</p>
          </div>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-3">
        <button
          @click="refreshCategories"
          :disabled="loading"
          class="inline-flex items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            v-if="!loading"
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          <svg
            v-else
            class="w-4 h-4 mr-2 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          {{ loading ? 'กำลังโหลด...' : 'รีเฟรช' }}
        </button>
        <router-link
          to="/categories/create"
          class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          เพิ่มหมวดหมู่ใหม่
        </router-link>
      </div>
    </div>

    <!-- Search Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 flex gap-3 items-center">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาหมวดหมู่..."
              class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
              @keyup.enter="handleSearch"
            />
          </div>
          <button
            @click="handleSearch"
            :disabled="loading"
            class="inline-flex items-center px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="!loading"
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4 mr-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            {{ loading ? 'กำลังค้นหา...' : 'ค้นหา' }}
          </button>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="inline-flex items-center px-3 py-3 border border-gray-300 text-gray-700 bg-white font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            title="ล้างการค้นหา"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="sm:w-auto flex gap-2">
          <select
            v-model="currentSort"
            @change="handleSortChange"
            class="px-3 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          >
            <option value="">เรียงลำดับ</option>
            <option value="name">ชื่อหมวดหมู่</option>
            <option value="createdAt">วันที่สร้าง</option>
            <option value="updatedAt">วันที่อัปเดต</option>
          </select>
          <button
            v-if="currentSort"
            @click="toggleSortOrder"
            class="inline-flex items-center px-3 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            :title="sortOrder === 'asc' ? 'เรียงจากน้อยไปมาก' : 'เรียงจากมากไปน้อย'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="sortOrder === 'asc'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              ></path>
            </svg>
          </button>
          <button
            @click="resetFilters"
            class="inline-flex items-center px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            รีเซ็ต
          </button>
          <button
            @click="refreshCategories"
            :disabled="loading"
            class="inline-flex items-center px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="!loading"
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4 mr-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            {{ loading ? 'กำลังโหลด...' : 'รีเฟรช' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-6 rounded-lg bg-red-50 p-6 border border-red-200 shadow-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="relative">
        <div
          class="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-gray-800 rounded-full animate-spin"
          style="animation-delay: 0.5s"
        ></div>
      </div>
    </div>

    <!-- Categories Table -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="filteredCategories.length === 0" class="text-center py-12">
        <div
          class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 text-gray-400"
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบข้อมูลหมวดหมู่</h3>
        <p class="text-gray-500">ลองปรับเปลี่ยนคำค้นหาหรือเพิ่มหมวดหมู่ใหม่</p>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ชื่อหมวดหมู่
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                คำอธิบาย
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                วันที่สร้าง
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                วันที่อัปเดต
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr
              v-for="category in filteredCategories"
              :key="category._id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {{ category.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs">
                <span v-if="category.description">{{ category.description }}</span>
                <span v-else class="text-gray-400 italic">ไม่มีคำอธิบาย</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ category.formattedCreatedAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ category.formattedUpdatedAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <router-link
                    :to="`/edit_categories/${category._id}`"
                    class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </router-link>
                  <button
                    @click="confirmDelete(category)"
                    class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="mt-8 flex items-center justify-between">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="goToPage(pagination.currentPage - 1)"
          :disabled="pagination.currentPage <= 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          ก่อนหน้า
        </button>
        <button
          @click="goToPage(pagination.currentPage + 1)"
          :disabled="pagination.currentPage >= pagination.totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          ถัดไป
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            แสดง
            <span class="font-medium text-gray-600">{{
              (pagination.currentPage - 1) * pagination.itemsPerPage + 1
            }}</span>
            ถึง
            <span class="font-medium text-gray-600">{{
              Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)
            }}</span>
            จาก
            <span class="font-medium text-gray-600">{{ pagination.totalItems }}</span>
            รายการ
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              @click="goToPage(pagination.currentPage - 1)"
              :disabled="pagination.currentPage <= 1"
              class="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200',
                page === pagination.currentPage
                  ? 'z-10 bg-gray-800 border-gray-800 text-white shadow-sm'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="goToPage(pagination.currentPage + 1)"
              :disabled="pagination.currentPage >= pagination.totalPages"
              class="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-8 border w-96 shadow-lg rounded-lg bg-white">
        <div class="text-center">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">ยืนยันการลบ</h3>
          <div class="mb-6">
            <p class="text-gray-600">
              คุณต้องการลบหมวดหมู่ "{{ categoryToDelete?.name }}" หรือไม่?
            </p>
            <p class="text-red-600 font-medium text-sm mt-2">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
          </div>
          <div class="flex space-x-3 justify-center">
            <button
              @click="deleteCategory"
              :disabled="loading"
              class="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50 transition-all duration-200"
            >
              ลบ
            </button>
            <button
              @click="showDeleteModal = false"
              class="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, defineExpose } from 'vue'
import { useCategoryStore } from '../stores/category'
import type { Category } from '../stores/category'
import { useRoute } from 'vue-router'

const categoryStore = useCategoryStore()

// Reactive data
const searchQuery = ref('')
const showDeleteModal = ref(false)
const categoryToDelete = ref<Category | null>(null)

// Add reactive state for current sort
const currentSort = ref('')

// Add reactive state for sort order
const sortOrder = ref<'asc' | 'desc'>('asc')

// Computed properties
const { loading, error, pagination } = categoryStore

// Reactive computed property that will always return a fresh reference and can be mapped
const categories = computed(() => {
  console.log('Computing categories:', categoryStore.categories.length, 'items')
  // Create a new array reference and map each category to ensure reactivity
  return categoryStore.categories.map((category) => ({
    ...category,
    // Add any computed properties or transformations here if needed
    formattedCreatedAt: formatDate(category.createdAt),
    formattedUpdatedAt: formatDate(category.updatedAt),
  }))
})

// Computed property for filtered categories (server-side search only)
const filteredCategories = computed(() => {
  // Return categories directly from server - no client-side filtering
  return categories.value
})

const visiblePages = computed(() => {
  const current = pagination.currentPage
  const total = pagination.totalPages
  const pages = []

  // Show up to 5 pages around current page
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const handleSearch = () => {
  console.log('Manual search triggered for:', searchQuery.value)
  // Clear any existing timeout and execute search immediately
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  // Reset to first page when searching
  pagination.currentPage = 1
  fetchCategories()
}

const clearSearch = () => {
  console.log('Clearing search')
  searchQuery.value = ''
  pagination.currentPage = 1
  fetchCategories()
}

const refreshCategories = () => {
  console.log('Force refreshing categories')
  fetchCategories()
}

// Sort categories by different criteria
const sortCategories = (
  sortBy: 'name' | 'createdAt' | 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'asc',
) => {
  console.log('Sorting categories by:', sortBy, sortOrder)
  const params: any = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
    sortBy,
    sortOrder,
  }

  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim()
  }

  categoryStore.fetchCategories(params)
}

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  currentSort.value = value
  if (value) {
    sortCategories(value as any, sortOrder.value)
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  if (currentSort.value) {
    sortCategories(currentSort.value as any, sortOrder.value)
  }
}

const resetFilters = () => {
  console.log('Resetting all filters')
  searchQuery.value = ''
  currentSort.value = ''
  sortOrder.value = 'asc'
  pagination.currentPage = 1
  fetchCategories()
}

const fetchCategories = () => {
  const params: any = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
  }

  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim()
  }

  categoryStore.fetchCategories(params)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.totalPages) {
    pagination.currentPage = page
    fetchCategories()
  }
}

const confirmDelete = (category: Category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return

  try {
    await categoryStore.deleteCategory(categoryToDelete.value._id)
    showDeleteModal.value = false
    categoryToDelete.value = null
    // Refresh the current page
    fetchCategories()
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
// Route tracking
const route = useRoute()

// Lifecycle
onMounted(async () => {
  try {
    await categoryStore.fetchCategories()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

onUnmounted(() => {
  // Cleanup timeout on component unmount
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  console.log('Component unmounted')
})

// Watch for route changes to refetch data when navigating to this page
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath === '/categories' && oldPath === '/') {
      // When redirecting from root to categories, refetch data
      console.log('Refetching data after redirect')
      categoryStore.fetchCategories().catch((error) => {
        console.error('Error refetching data:', error)
      })
    }
  },
)

// Watch for changes in categoryStore.categories to trigger reactivity
watch(
  () => categoryStore.categories,
  (newCategories) => {
    console.log('Categories updated in store:', newCategories.length, 'items')
  },
  { deep: true },
)

// Watch for pagination changes to ensure categories are refreshed
watch(
  () => pagination.currentPage,
  (newPage, oldPage) => {
    if (newPage !== oldPage) {
      console.log('Page changed from', oldPage, 'to', newPage)
      // Categories will be automatically refreshed via fetchCategories
    }
  },
)

// Debounced search watcher (optional - for auto-search if needed)
let searchTimeout: number | null = null
watch(
  () => searchQuery.value,
  (newQuery) => {
    console.log('Search query changed:', newQuery)
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for debounced search (disabled for manual search)
    // searchTimeout = setTimeout(() => {
    //   console.log('Executing debounced search')
    //   fetchCategories()
    // }, 500) // 500ms delay
  },
)

// Export methods for potential use in template
defineExpose({
  handleSearch,
  clearSearch,
  refreshCategories,
  sortCategories,
  handleSortChange,
  toggleSortOrder,
  resetFilters,
})

// Watch for route changes to refetch data when navigating to this page
watch(
  () => route.path,
  async (newPath, oldPath) => {
    if (newPath === '/categories' && oldPath === 'products') {
      // When redirecting from root to products, refetch data
      console.log('Refetching data after redirect')
      await categoryStore.fetchCategories().catch((error) => {
        console.error('Error refetching data:', error)
      })
    }
  },
)
</script>
