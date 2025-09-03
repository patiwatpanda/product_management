const Category = require('../models/Category');

// GET /api/categories - Get all categories with optional filtering
exports.getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        // Build filter object
        const filter = { deletedAt: null }; // Only get non-deleted categories

        if (search) {
            // Clean and trim the search term
            const cleanSearch = search.trim();

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

                if (searchWords.length > 0) {
                    // Create regex pattern that matches any of the words (case-insensitive)
                    const regexPattern = searchWords.join('|');

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
        const categories = await Category.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Category.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: categories,
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

// GET /api/categories/:id - Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }
        
        const category = await Category.findOne({ _id: id, deletedAt: null });
            
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// POST /api/categories - Create new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Validate required fields
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }
        
        const category = new Category({
            name,
            description
        });
        
        const savedCategory = await category.save();
        
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: savedCategory
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
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// PUT /api/categories/:id - Update category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }
        
        // Check if category exists
        const existingCategory = await Category.findOne({ _id: id, deletedAt: null });
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        // Update category
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
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
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// DELETE /api/categories/:id - Soft delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }
        
        const category = await Category.findOne({ _id: id, deletedAt: null });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        // Soft delete by setting deletedAt timestamp
        await Category.findByIdAndUpdate(id, { deletedAt: new Date() });
        
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
