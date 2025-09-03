import { createRouter, createWebHistory } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useCategoryStore } from '../stores/category'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/products/create',
      name: 'CreateProduct',
      component: () => import('../views/CreateProductView.vue'),
    },
    {
      path: '/edit_products/:id',
      name: 'EditProduct',
      component: () => import('../views/EditProductView.vue'),
      props: true,
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/categories/create',
      name: 'CreateCategory',
      component: () => import('../views/CreateCategoryView.vue'),
    },
    {
      path: '/edit_categories/:id',
      name: 'EditCategory',
      component: () => import('../views/EditCategoryView.vue'),
      props: true,
    },
  ],
})

// Navigation guard to ensure data is fetched when redirecting
router.beforeEach(async (to, from, next) => {
  if (to.path === '/products' && from.path === '/' || from.path === 'categories') {
    console.log('Redirecting from / to /products, fetching data...')
    const productStore = useProductStore()
    const categoryStore = useCategoryStore()

    try {
      await Promise.all([productStore.fetchProducts(), categoryStore.fetchCategories()])
      console.log('Data fetched successfully')
    } catch (error) {
      console.error('Error fetching data in navigation guard:', error)
    }
  }
  next()
})

export default router
