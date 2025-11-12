/**
 * @file modules/drivers/controller.js - Driver controller
 * @description وحدة التحكم لإدارة السائقين
 */

const User = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

// @desc    Get all drivers
// @route   GET /api/drivers
// @access Private
exports.getAllDrivers = asyncHandler(async (req, res, next) => {
  const drivers = await User.find({ role: 'driver' }).select('-password');

  res.status(200).json({
    success: true,
    count: drivers.length,
    data: drivers
  });
});

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Private
exports.getDriverById = asyncHandler(async (req, res, next) => {
  const driver = await User.findById(req.params.id).select('-password');

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: driver
  });
});

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private
exports.updateDriver = asyncHandler(async (req, res, next) => {
  const driver = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).select('-password');

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: driver
  });
});

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private/Admin
exports.deleteDriver = asyncHandler(async (req, res, next) => {
  const driver = await User.findById(req.params.id);

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  await driver.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Update driver documents
// @route   PUT /api/drivers/:id/documents
// @access  Private
exports.updateDriverDocuments = asyncHandler(async (req, res, next) => {
  const { nationalId, license, photo } = req.body;

  const driver = await User.findByIdAndUpdate(
    req.params.id,
    {
      'driverDocuments.nationalId': nationalId,
      'driverDocuments.license': license,
      'driverDocuments.photo': photo,
      'driverDocuments.status': 'pending' // تغيير الحالة إلى في الانتظار للمراجعة
    },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: driver
  });
});

// @desc    Verify driver (admin only)
// @route   PUT /api/drivers/:id/verify
// @access  Private/Admin
exports.verifyDriver = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return next(new ErrorResponse('Status must be either approved or rejected', 400));
  }

  const driver = await User.findByIdAndUpdate(
    req.params.id,
    {
      'driverDocuments.status': status
    },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: driver
  });
});

// @desc    Get pending drivers for verification
// @route   GET /api/drivers/pending
// @access  Private/Admin
exports.getPendingDrivers = asyncHandler(async (req, res, next) => {
  const drivers = await User.find({
    role: 'driver',
    'driverDocuments.status': 'pending'
  }).select('-password');

  res.status(200).json({
    success: true,
    count: drivers.length,
    data: drivers
  });
});

// @desc    Update driver location
// @route   PUT /api/drivers/:id/location
// @access  Private
exports.updateDriverLocation = asyncHandler(async (req, res, next) => {
  const { coordinates, address } = req.body;

  // التحقق من صحة الإحداثيات
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    return next(new ErrorResponse('Please provide valid coordinates [longitude, latitude]', 400));
  }

  const driver = await User.findByIdAndUpdate(
    req.params.id,
    {
      location: {
        type: 'Point',
        coordinates: coordinates, // [longitude, latitude]
        address: address
      }
    },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!driver || driver.role !== 'driver') {
    return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: driver
  });
});