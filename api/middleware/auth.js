/**
 * @file middleware/auth.js - Authentication middleware
 * @description هذا الملف يتضمن Middleware للتحقق من صحة المستخدم باستخدام JWT
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    // استخراج الرمز من رأس الطلب
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // التحقق من وجود الرمز
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // التحقق من الرمز
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // الحصول على المستخدم من قاعدة البيانات
      req.user = await User.findById(decoded.id).select('-password');
      
      // التحقق من أن المستخدم نشط
      if (!req.user || !req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is inactive'
        });
      }

      next();
    } catch (error) {
      logger.error(`Token verification error: ${error.message}`);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Middleware للتحقق من دور المستخدم
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { auth, authorize };