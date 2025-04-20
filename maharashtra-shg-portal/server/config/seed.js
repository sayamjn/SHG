

  require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const Group = require('../models/Group');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

// Sample data for seeding
const groups = [
    {
      name: 'Mahila Udyog Samiti',
      code: 'MUS001',
      password: 'password123',
      address: '123 Main Street, Andheri',
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai City',
      taluka: 'Mumbai City Taluka 1',
      village: 'Andheri',
      contactPerson: 'Priya Sharma',
      phone: '9876543210',
      email: 'priya@example.com',
      formationDate: new Date('2022-01-15'),
      totalMembers: 0, // This will be updated after adding members
      active: true
    },
    {
      name: 'Gram Vikas Mandal',
      code: 'GVM002',
      password: 'password123',
      address: '456 Village Road, Pune',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Pune Taluka 2',
      village: 'Kothrud',
      contactPerson: 'Rahul Patil',
      phone: '8765432109',
      email: 'rahul@example.com',
      formationDate: new Date('2021-11-10'),
      totalMembers: 0, // This will be updated after adding members
      active: true
    }
  ];
  
  const users = [
    {
      name: 'Anjali Deshmukh',
      address: '78 Shivaji Nagar, Pune',
      age: 35,
      gender: 'Female',
      phone: '7890123456',
      photo: 'no-photo.jpg',
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune',
      district: 'Pune',
      taluka: 'Pune Taluka 2',
      role: 'president',
      active: true,
      joinDate: new Date('2021-11-10')
    },
    {
      name: 'Meera Joshi',
      address: '45 MG Road, Pune',
      age: 28,
      gender: 'Female',
      phone: '8901234567',
      photo: 'no-photo.jpg',
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune',
      district: 'Pune',
      taluka: 'Pune Taluka 2',
      role: 'secretary',
      active: true,
      joinDate: new Date('2021-11-15')
    },
    {
      name: 'Sunita Patil',
      address: '23 Koregaon Park, Mumbai',
      age: 42,
      gender: 'Female',
      phone: '9012345678',
      photo: 'no-photo.jpg',
      country: 'India',
      state: 'Maharashtra',
      city: 'Mumbai',
      district: 'Mumbai City',
      taluka: 'Mumbai City Taluka 1',
      role: 'president',
      active: true,
      joinDate: new Date('2022-01-15')
    },
    {
      name: 'Rajesh Kumar',
      address: '56 Gandhi Road, Mumbai',
      age: 38,
      gender: 'Male',
      phone: '7123456789',
      photo: 'no-photo.jpg',
      country: 'India',
      state: 'Maharashtra',
      city: 'Mumbai',
      district: 'Mumbai City',
      taluka: 'Mumbai City Taluka 1',
      role: 'treasurer',
      active: true,
      joinDate: new Date('2022-01-20')
    }
  ];
  
  const schemes = [
    {
      title: 'Mudra Loan Scheme',
      description: 'Financial support for micro and small businesses run by Self Help Groups.',
      department: 'Ministry of Finance',
      eligibility: 'SHGs with at least 1 year of operation and good financial records.',
      benefits: 'Loans up to Rs. 10 lakh with subsidized interest rates and flexible repayment terms.',
      applicationProcess: 'Apply through local banks or financial institutions with SHG registration documents and business plan.',
      contactInfo: 'Toll Free: 1800-123-4567',
      website: 'https://www.mudra.org.in',
      documents: [],
      tags: ['Financial', 'Loans', 'Business'],
      lastUpdated: new Date('2023-12-10'),
      active: true
    },
    {
      title: 'Skill Development Program',
      description: 'Training programs to enhance skills of SHG members in various trades and crafts.',
      department: 'Ministry of Skill Development',
      eligibility: 'All registered SHG members aged 18-45.',
      benefits: 'Free training, certification, and placement assistance after completion.',
      applicationProcess: 'Register through your SHG coordinator or directly at District Rural Development Agency.',
      contactInfo: 'Email: skills@maharashtra.gov.in',
      website: 'https://www.skillsindia.gov.in',
      documents: [],
      tags: ['Training', 'Education', 'Employment'],
      lastUpdated: new Date('2023-11-15'),
      active: true
    },
    {
      title: 'Rural Market Access Initiative',
      description: 'Connecting SHGs with markets to sell their products at fair prices.',
      department: 'Department of Rural Development',
      eligibility: 'SHGs involved in production of handicrafts, textiles, food products, or other marketable goods.',
      benefits: 'Access to government exhibitions, online marketplace, and bulk buyers.',
      applicationProcess: 'Submit product samples and registration form to the District Rural Development Office.',
      contactInfo: 'Phone: 022-2345-6789',
      website: 'https://rural.maharashtra.gov.in/marketaccess',
      documents: [],
      tags: ['Marketing', 'Business', 'Rural'],
      lastUpdated: new Date('2024-01-20'),
      active: true
    }
  ];

connectDB()
  .then(async () => {
    try {
      // Clear existing data
      await Group.deleteMany();
      await User.deleteMany();
      await Scheme.deleteMany();
      console.log('✅ Cleared existing data');

      // Insert groups (passwords stored as provided)
      const createdGroups = await Group.insertMany(groups);
      console.log(`✅ Added ${createdGroups.length} groups`);

      // Associate users to groups
      const usersToCreate = [];
      usersToCreate.push({ ...users[2], group: createdGroups[0]._id });
      usersToCreate.push({ ...users[3], group: createdGroups[0]._id });
      usersToCreate.push({ ...users[0], group: createdGroups[1]._id });
      usersToCreate.push({ ...users[1], group: createdGroups[1]._id });

      const createdUsers = await User.insertMany(usersToCreate);
      console.log(`✅ Added ${createdUsers.length} users`);

      // Update totalMembers count on each group
      for (const grp of createdGroups) {
        const count = await User.countDocuments({ group: grp._id });
        await Group.findByIdAndUpdate(grp._id, { totalMembers: count });
      }
      console.log('✅ Updated group member counts');

      // Insert schemes
      const createdSchemes = await Scheme.insertMany(schemes);
      console.log(`✅ Added ${createdSchemes.length} schemes`);

      // Print login info for testing
      console.log('\n🔑 LOGIN CREDENTIALS FOR TESTING:');
      createdGroups.forEach(g => console.log(`Group: ${g.name} (${g.code}) – Password: password123`));

      console.log('\n✅ Database seeding completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n❌ Database connection failed:', error);
    process.exit(1);
  });
