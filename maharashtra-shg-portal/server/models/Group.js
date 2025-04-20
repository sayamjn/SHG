const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a group name'],
      trim: true,
      maxlength: [100, 'Group name cannot be more than 100 characters']
    },
    code: {
      type: String,
      required: [true, 'Please add a group code'],
      unique: true,
      trim: true,
      maxlength: [20, 'Group code cannot be more than 20 characters']
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    country: {
      type: String,
      required: [true, 'Please add country']
    },
    state: {
      type: String,
      required: [true, 'Please add state']
    },
    district: {
      type: String,
      required: [true, 'Please add district']
    },
    taluka: {
      type: String,
      required: [true, 'Please add taluka']
    },
    ward: {
      type: String
    },
    village: {
      type: String
    },
    contactPerson: {
      type: String,
      required: [true, 'Please add a contact person']
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number']
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    formationDate: {
      type: Date,
      default: Date.now
    },
    totalMembers: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


// Reverse populate with virtuals
GroupSchema.virtual('members', {
  ref: 'User',
  localField: '_id',
  foreignField: 'group',
  justOne: false
});

module.exports = mongoose.model('Group', GroupSchema);
