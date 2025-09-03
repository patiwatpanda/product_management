<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-white"
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
                <h1 class="text-xl font-bold text-gray-900">ระบบจัดการสินค้า</h1>
              </div>
            </div>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-4 items-center justify-center">
              <router-link
                to="/products"
                class="group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                active-class="bg-gray-100 text-gray-700 shadow-sm"
              >
                <span class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                  <span>สินค้า</span>
                </span>
                <div
                  class="absolute inset-x-0 -bottom-px h-px bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                ></div>
              </router-link>
              <router-link
                to="/categories"
                class="group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                active-class="bg-gray-100 text-gray-700 shadow-sm"
              >
                <span class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  <span>หมวดหมู่</span>
                </span>
                <div
                  class="absolute inset-x-0 -bottom-px h-px bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                ></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #374151;
}
</style>
