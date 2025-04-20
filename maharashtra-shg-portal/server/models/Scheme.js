const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    department: {
      type: String,
      required: [true, 'Please add a department']
    },
    eligibility: {
      type: String,
      required: [true, 'Please add eligibility criteria']
    },
    benefits: {
      type: String,
      required: [true, 'Please add benefits']
    },
    applicationProcess: {
      type: String,
      required: [true, 'Please add application process']
    },
    contactInfo: {
      type: String
    },
    website: {
      type: String
    },
    documents: [
      {
        name: {
          type: String,
          required: true
        },
        file: {
          type: String,
          required: true
        },
        fileType: {
          type: String,
          required: true
        },
        fileSize: {
          type: Number,
          required: true
        }
      }
    ],
    tags: {
      type: [String],
      required: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Create index for text search
SchemeSchema.index({
  title: 'text',
  description: 'text',
  eligibility: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Scheme', SchemeSchema);