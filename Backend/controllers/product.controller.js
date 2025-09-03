
const Product = require('../models/Product');
const Category = require('../models/Category');
// GET /api/products - Get all products with optional filtering
exports.getAllProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, category, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
      // Build filter object
      const filter = { deletedAt: null }; // Only get non-deleted products
  console.log(search,"search");
      if (category) {
        filter.categoryId = category;
      }
  
            if (search) {
        // Clean and trim the search term
        const cleanSearch = search.trim();
        console.log(cleanSearch, "cleanSearch");
        
        if (cleanSearch) {
          // Split into words and clean each word
          const searchWords = cleanSearch
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(word => {
              // Remove unnecessary characters from the end of words
              let cleanedWord = word.replace(/[.,!?;:]+$/, ''); // Remove punctuation from end
              
              // Remove unnecessary characters from the beginning of words
              cleanedWord = cleanedWord.replace(/^[.,!?;:]+/, ''); // Remove punctuation from start
              
              // Remove extra spaces
              cleanedWord = cleanedWord.trim();
              
              return cleanedWord;
            })
            .filter(word => word.length > 0); // Filter out empty words after cleaning
          
          console.log(searchWords, "searchWords");
          
          if (searchWords.length > 0) {
            // Create regex pattern that matches any of the words (case-insensitive)
            const regexPattern = searchWords.join('|');
            console.log(regexPattern, "regexPattern");
            
            // Search across name and description
            filter.$or = [
              { name: { $regex: regexPattern, $options: 'i' } },
              { description: { $regex: regexPattern, $options: 'i' } }
            ];
          }
        }
      }
  
      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // Execute query
      const products = await Product.find(filter)
        .populate('categoryId', 'name description')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
  
      const total = await Product.countDocuments(filter);
  
      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
// exports.getAllProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, category, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        
//         // Build filter object
//         const filter = { deletedAt: null }; // Only get non-deleted products
//             console.log(search,"search");
//         if (category) {
//             filter.categoryId = category;
//         }
        
//         if (search) {
//             // Clean and trim the search term
//             const cleanSearch = search.trim();
            
//             if (cleanSearch) {
//                 // Build regex for case-insensitive search
//                 // แยกคำค้นหาและสร้าง regex pattern ที่ยืดหยุ่น
//                 const searchWords = cleanSearch
//                     .split(/\s+/)
//                     .filter(word => word.length > 0) // กรองคำที่ว่างเปล่า
//                     .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape regex special chars
                
//                 if (searchWords.length > 0) {
//                     // สร้าง regex pattern ที่ค้นหาคำใดคำหนึ่งในชื่อสินค้าหรือคำอธิบาย
//                     const regexPattern = searchWords.join('|');
//                     filter.$or = [
//                         { name: { $regex: regexPattern, $options: 'i' } },
//                         { description: { $regex: regexPattern, $options: 'i' } }
//                     ];
//                 }
//             }
//         }
        
//         // Build sort object
//         const sort = {};
//         sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
//         // Calculate pagination
//         const skip = (parseInt(page) - 1) * parseInt(limit);
        
//         const products = await Product.find(filter)
//             .populate('categoryId', 'name description')
//             .sort(sort)
//             .skip(skip)
//             .limit(parseInt(limit));
            
//         const total = await Product.countDocuments(filter);
        
//         res.status(200).json({
//             success: true,
//             data: products,
//             pagination: {
//                 currentPage: parseInt(page),
//                 totalPages: Math.ceil(total / parseInt(limit)),
//                 totalItems: total,
//                 itemsPerPage: parseInt(limit)
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };

// GET /api/products/:id - Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        
        const product = await Product.findOne({ _id: id, deletedAt: null })
            .populate('categoryId', 'name description');
            
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// POST /api/products - Create new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, stock } = req.body;
        
        // Validate required fields
        if (!name || !price || !categoryId) {
            return res.status(400).json({
                success: false,
                message: 'Name, price, and category are required'
            });
        }
        
        // Check if category exists
        const category = await Category.findOne({ _id: categoryId, deletedAt: null });
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        // Check if product name already exists
        const existingProduct = await Product.findOne({ 
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            deletedAt: null 
        });
        
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product with this name already exists'
            });
        }
        
        const product = new Product({
            name,
            description,
            price,
            categoryId,
            stock: stock || 0
        });
        
        const savedProduct = await product.save();
        await savedProduct.populate('categoryId', 'name description');
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// PUT /api/products/:id - Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, stock } = req.body;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        
        // Check if product exists
        const existingProduct = await Product.findOne({ _id: id, deletedAt: null });
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // If categoryId is being updated, check if it exists
        if (categoryId) {
            const category = await Category.findOne({ _id: categoryId, deletedAt: null });
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }
        
        // If name is being updated, check for duplicates
        if (name && name !== existingProduct.name) {
            const duplicateProduct = await Product.findOne({ 
                name: { $regex: new RegExp(`^${name}$`, 'i') },
                _id: { $ne: id },
                deletedAt: null 
            });
            
            if (duplicateProduct) {
                return res.status(400).json({
                    success: false,
                    message: 'Product with this name already exists'
                });
            }
        }
        
        // Update product
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (categoryId !== undefined) updateData.categoryId = categoryId;
        if (stock !== undefined) updateData.stock = stock;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('categoryId', 'name description');
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// DELETE /api/products/:id - Soft delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        
        const product = await Product.findOne({ _id: id, deletedAt: null });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Soft delete by setting deletedAt timestamp
        await Product.findByIdAndUpdate(id, { deletedAt: new Date() });
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// PATCH /api/products/:id/stock - Update product stock
exports.updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock, operation = 'set' } = req.body; // operation: 'set', 'add', 'subtract'
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        
        if (stock === undefined || stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid stock value is required'
            });
        }
        
        const product = await Product.findOne({ _id: id, deletedAt: null });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        let newStock;
        switch (operation) {
            case 'add':
                newStock = product.stock + stock;
                break;
            case 'subtract':
                newStock = product.stock - stock;
                if (newStock < 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Insufficient stock'
                    });
                }
                break;
            case 'set':
            default:
                newStock = stock;
                break;
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { stock: newStock },
            { new: true, runValidators: true }
        ).populate('categoryId', 'name description');
        
        res.status(200).json({
            success: true,
            message: 'Product stock updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { query, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;    

        const searchFilter = { deletedAt: null };
        
        if (query) {
            // Clean and trim the search term
            const cleanQuery = query.trim();
            
            if (cleanQuery) {
                // Build regex for case-insensitive search
                const searchWords = cleanQuery
                    .split(/\s+/)
                    .filter(word => word.length > 0) // กรองคำที่ว่างเปล่า
                    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape regex special chars
                
                if (searchWords.length > 0) {
                    // สร้าง regex pattern ที่ค้นหาคำใดคำหนึ่งในชื่อสินค้าหรือคำอธิบาย
                    const regexPattern = searchWords.join('|');
                    searchFilter.$or = [
                        { name: { $regex: regexPattern, $options: 'i' } },
                        { description: { $regex: regexPattern, $options: 'i' } }
                    ];
                }
            }
        }
        
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;   
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const products = await Product
            .find(searchFilter)
            .populate('categoryId', 'name description')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Product.countDocuments(searchFilter);

        res.status(200).json({      
            success: true,
            data: products,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),         
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });     
        }   
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }       
};