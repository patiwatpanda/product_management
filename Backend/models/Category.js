// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true, // Prevent duplicate categories
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  deletedAt: {
    type: Date,
    default: null // For soft delete
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for search
categorySchema.index({ name: 'text' });

module.exports = mongoose.model('Category', categorySchema);