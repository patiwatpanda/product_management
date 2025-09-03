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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">จัดการสินค้า</h1>
            <p class="text-gray-500 mt-1">ดูและจัดการรายการสินค้าทั้งหมด</p>
          </div>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-3">
        <button
          @click="refreshProducts"
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
          to="/products/create"
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
          เพิ่มสินค้าใหม่
        </router-link>
      </div>
    </div>

    <!-- Search and Filter Card -->
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
              placeholder="ค้นหาสินค้า..."
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
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
        <div class="sm:w-48">
          <select
            v-model="selectedCategory"
            class="block w-full py-3 px-4 border border-gray-300 rounded-lg bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            @change="handleCategoryFilter"
          >
            <option value="">ทุกหมวดหมู่</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="sm:w-auto flex gap-2">
          <select
            v-model="currentSort"
            @change="handleSortChange"
            class="px-3 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          >
            <option value="">เรียงลำดับ</option>
            <option value="name">ชื่อสินค้า</option>
            <option value="price">ราคา</option>
            <option value="stock">สต็อก</option>
            <option value="createdAt">วันที่สร้าง</option>
          </select>
          <button
            v-if="currentSort"
            @click="toggleSortOrder"
            class="inline-flex items-center px-3 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
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
            class="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
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
          class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-pink-600 rounded-full animate-spin"
          style="animation-delay: 0.5s"
        ></div>
      </div>
    </div>

    <!-- Products Table -->
    <div v-else>
      <!-- Debug Info -->
      <div class="mb-4 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-700">
          Debug Info: Products in store: {{ productStore.products.length }}, Filtered products:
          {{ filteredProducts.length }}, Search query: "{{ searchQuery }}", Pagination:
          {{ pagination.currentPage }}/{{ pagination.totalPages }} ({{ pagination.totalItems }}
          total)
        </p>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบข้อมูลสินค้า</h3>
        <p class="text-gray-500">ลองปรับเปลี่ยนคำค้นหาหรือเพิ่มสินค้าใหม่</p>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                ชื่อสินค้า
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                รายละเอียด
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                หมวดหมู่
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                ราคา
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                สต็อก
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                วันที่สร้าง
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="product in filteredProducts"
              :key="product._id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">
                {{ product.description || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {{ product.categoryId.name }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <span class="text-lg font-bold text-gray-900">
                  {{ product.formattedPrice }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                    product.stockStatus === 'high'
                      ? 'bg-green-100 text-green-800'
                      : product.stockStatus === 'low'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                {{ formatDate(product.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <router-link
                    :to="`/edit_products/${product._id}`"
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
                    @click="confirmDelete(product)"
                    class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
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
            <span class="font-medium text-gray-900">{{
              (pagination.currentPage - 1) * pagination.itemsPerPage + 1
            }}</span>
            ถึง
            <span class="font-medium text-gray-900">{{
              Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)
            }}</span>
            จาก
            <span class="font-medium text-gray-900">{{ pagination.totalItems }}</span>
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
            <p class="text-gray-600">คุณต้องการลบสินค้า "{{ productToDelete?.name }}" หรือไม่?</p>
            <p class="text-red-600 font-medium text-sm mt-2">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
          </div>
          <div class="flex space-x-3 justify-center">
            <button
              @click="deleteProduct"
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
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useCategoryStore } from '../stores/category'
import type { Product } from '../stores/product'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const showDeleteModal = ref(false)
const productToDelete = ref<Product | null>(null)

// Search timeout for debounced search
let searchTimeout: number | null = null

// Computed properties
const { loading, error, pagination } = productStore
const { categories } = categoryStore

// Reactive computed property that will always return a fresh reference and can be mapped
const products = computed(() => {
  console.log('Computing products:', productStore.products.length, 'items')
  console.log('Raw products from store:', productStore.products)
  // Create a new array reference and map each product to ensure reactivity
  const mappedProducts = productStore.products.map((product) => ({
    ...product,
    // Add any computed properties or transformations here if needed
    formattedPrice: `฿${product.price.toLocaleString()}`,
    stockStatus: product.stock > 10 ? 'high' : product.stock > 0 ? 'low' : 'out',
  }))
  console.log('Mapped products:', mappedProducts)
  return mappedProducts
})

// Computed property for filtered products (if needed for client-side filtering)
const filteredProducts = computed(() => {
  let filtered = products.value
  console.log('Filtered products computed - total products:', filtered.length)
  console.log('Search query:', searchQuery.value)

  // Since we're using server-side search, we should return all products
  // Client-side filtering is only for additional filtering if needed
  // For now, let's return all products to see if the issue is with filtering
  return filtered
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
  fetchProducts()
}

const clearSearch = () => {
  console.log('Clearing search')
  searchQuery.value = ''
  pagination.currentPage = 1
  fetchProducts()
}

const resetFilters = () => {
  console.log('Resetting all filters')
  searchQuery.value = ''
  selectedCategory.value = ''
  currentSort.value = ''
  sortOrder.value = 'asc'
  pagination.currentPage = 1
  fetchProducts()
}

const handleCategoryFilter = () => {
  fetchProducts()
}

const fetchProducts = () => {
  const params: any = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
  }

  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim()
  }

  if (selectedCategory.value) {
    params.category = selectedCategory.value
  }
  console.log(params, 'params')
  productStore.fetchProducts(params)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.totalPages) {
    pagination.currentPage = page
    fetchProducts()
  }
}

const confirmDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = async () => {
  if (!productToDelete.value) return

  try {
    await productStore.deleteProduct(productToDelete.value._id)
    showDeleteModal.value = false
    productToDelete.value = null
    // Refresh the current page
    fetchProducts()
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

// Force refresh products - useful when you need to ensure fresh data
const refreshProducts = () => {
  console.log('Force refreshing products')
  fetchProducts()
}

// Sort products by different criteria
const sortProducts = (
  sortBy: 'name' | 'price' | 'stock' | 'createdAt',
  sortOrder: 'asc' | 'desc' = 'asc',
) => {
  console.log('Sorting products by:', sortBy, sortOrder)
  const params: any = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
    sortBy,
    sortOrder,
  }

  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim()
  }

  if (selectedCategory.value) {
    params.category = selectedCategory.value
  }

  productStore.fetchProducts(params)
}

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  currentSort.value = value
  if (value) {
    sortProducts(value as any, sortOrder.value)
  }
}

// Add reactive state for current sort
const currentSort = ref('')

// Add reactive state for sort order
const sortOrder = ref<'asc' | 'desc'>('asc')

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  if (currentSort.value) {
    sortProducts(currentSort.value as any, sortOrder.value)
  }
}

// Export methods for potential use in template
defineExpose({
  handleSearch,
  clearSearch,
  resetFilters,
  refreshProducts,
  sortProducts,
  handleSortChange,
  toggleSortOrder,
})

// Route tracking
const route = useRoute()

// Lifecycle
onMounted(async () => {
  try {
    // Fetch both products and categories
    await Promise.all([productStore.fetchProducts(), categoryStore.fetchCategories()])
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
    if (newPath === '/products' && oldPath === '/') {
      // When redirecting from root to products, refetch data
      console.log('Refetching data after redirect')
      Promise.all([productStore.fetchProducts(), categoryStore.fetchCategories()]).catch(
        (error) => {
          console.error('Error refetching data:', error)
        },
      )
    }
  },
)
// Watch for changes in productStore.products to trigger reactivity
watch(
  () => productStore.products,
  (newProducts) => {
    console.log('Products updated in store:', newProducts.length, 'items')
  },
  { deep: true },
)

// Watch for pagination changes to ensure products are refreshed
watch(
  () => pagination.currentPage,
  (newPage, oldPage) => {
    if (newPage !== oldPage) {
      console.log('Page changed from', oldPage, 'to', newPage)
      // Products will be automatically refreshed via fetchProducts
    }
  },
)

// Debounced search watcher (optional - for auto-search if needed)
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
    //   fetchProducts()
    // }, 500) // 500ms delay
  },
)
</script>
