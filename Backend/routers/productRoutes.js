const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);
// // GET /api/products - Get all products with filtering, pagination, and search
// router.get('/', productController.getAllProducts);

// // GET /api/products/search - Search products (alternative endpoint)
// router.get('/search', productController.searchProducts);

// // GET /api/products/:id - Get product by ID
// router.get('/:id', productController.getProductById);

// // POST /api/products - Create new product
// router.post('/', productController.createProduct);

// // PUT /api/products/:id - Update product
// router.put('/:id', productController.updateProduct);

// // DELETE /api/products/:id - Soft delete product
// router.delete('/:id', productController.deleteProduct);

// // PATCH /api/products/:id/stock - Update product stock
// router.patch('/:id/stock', productController.updateProductStock);
module.exports = router;
