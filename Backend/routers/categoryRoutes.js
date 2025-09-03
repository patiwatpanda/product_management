const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/catagory.controller');

// // GET /api/categories - Get all categories with filtering, pagination, and search
router.get('/categories', categoryController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/category/:id', categoryController.getCategoryById);

// POST /api/categories - Create new category
router.post('/category', categoryController.createCategory);

// PUT /api/categories/:id - Update category
router.put('/category/:id', categoryController.updateCategory);

// DELETE /api/categories/:id - Soft delete category
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;

