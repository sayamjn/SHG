const Scheme = require('../models/Scheme');
const path = require('path');
const fs = require('fs');

// @desc    Get all schemes
// @route   GET /api/schemes
// @access  Public
exports.getSchemes = async (req, res, next) => {
  try {
    let query = {};

    // Search by text
    if (req.query.search) {
      query = {
        $text: {
          $search: req.query.search
        }
      };
    }

    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }

    // Filter by department
    if (req.query.department) {
      query.department = req.query.department;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Scheme.countDocuments(query);

    const schemes = await Scheme.find(query)
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: schemes.length,
      pagination,
      data: schemes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single scheme
// @route   GET /api/schemes/:id
// @access  Public
exports.getScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        error: 'Scheme not found'
      });
    }

    res.status(200).json({
      success: true,
      data: scheme
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new scheme
// @route   POST /api/schemes
// @access  Private
exports.createScheme = async (req, res, next) => {
  try {
    // Handle file uploads
    if (req.files && req.files.length > 0) {
      req.body.documents = req.files.map(file => ({
        name: file.originalname,
        file: file.filename,
        fileType: path.extname(file.originalname).substring(1),
        fileSize: file.size
      }));
    }

    // Convert tags from string to array
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      data: scheme
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update scheme
// @route   PUT /api/schemes/:id
// @access  Private
exports.updateScheme = async (req, res, next) => {
  try {
    let scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        error: 'Scheme not found'
      });
    }

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      // Delete old files
      if (scheme.documents && scheme.documents.length > 0) {
        scheme.documents.forEach(doc => {
          const filePath = path.join(__dirname, '..', 'uploads', doc.file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }

      req.body.documents = req.files.map(file => ({
        name: file.originalname,
        file: file.filename,
        fileType: path.extname(file.originalname).substring(1),
        fileSize: file.size
      }));
    }

    // Convert tags from string to array
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    // Update lastUpdated field
    req.body.lastUpdated = Date.now();

    scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: scheme
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete scheme
// @route   DELETE /api/schemes/:id
// @access  Private
exports.deleteScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        error: 'Scheme not found'
      });
    }

    // Delete associated files
    if (scheme.documents && scheme.documents.length > 0) {
      scheme.documents.forEach(doc => {
        const filePath = path.join(__dirname, '..', 'uploads', doc.file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await scheme.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};