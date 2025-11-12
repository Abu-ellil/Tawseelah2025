/**
 * @file modules/drivers/routes.js - Driver routes
 * @description.routes لإدارة السائقين
 */

const express = require('express');
const { auth, authorize } = require('../../middleware/auth');
const { 
  getAllDrivers, 
  getDriverById, 
  updateDriver, 
  deleteDriver,
  updateDriverDocuments,
  verifyDriver,
  getPendingDrivers,
  updateDriverLocation
} = require('./controller');

const router = express.Router();

// @route   GET api/drivers
// @desc    Get all drivers
// @access  Private
router.get('/', auth, getAllDrivers);

// @route   GET api/drivers/:id
// @desc    Get single driver
// @access  Private
router.get('/:id', auth, getDriverById);

// @route   PUT api/drivers/:id
// @desc    Update driver
// @access  Private
router.put('/:id', auth, updateDriver);

// @route   DELETE api/drivers/:id
// @desc    Delete driver
// @access  Private/Admin
router.delete('/:id', auth, authorize('admin'), deleteDriver);

// @route   PUT api/drivers/:id/documents
// @desc    Update driver documents
// @access  Private
router.put('/:id/documents', auth, updateDriverDocuments);

// @route   PUT api/drivers/:id/verify
// @desc    Verify driver (admin only)
// @access  Private/Admin
router.put('/:id/verify', auth, authorize('admin'), verifyDriver);

// @route   GET api/drivers/pending
// @desc    Get pending drivers for verification
// @access  Private/Admin
router.get('/pending', auth, authorize('admin'), getPendingDrivers);

// @route   PUT api/drivers/:id/location
// @desc    Update driver location
// @access  Private
router.put('/:id/location', auth, updateDriverLocation);

module.exports = router;