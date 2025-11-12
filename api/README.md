# منصة توصيل - Tawseela Backend

نظام توصيل متكامل مبني باستخدام Node.js وExpress مع دعم للتعقب في الوقت الفعلي باستخدام Socket.io

## المميزات

- **نظام تعقب في الوقت الفعلي**: باستخدام Socket.io لمتابعة السائقين والطلبات
- **نظام مصادقة قوي**: باستخدام JWT ودعم تسجيل الدخول عبر البريد الإلكتروني وكلمة المرور
- **نظام دفع متكامل**: دعم المحاكيات لبوابات Paymob وFawry
- **نظام التحقق من السائقين**: مراجعة المستندات من قبل الأدمن
- **واجهة إدارة الأدمن**: مراجعة السائقين، إدارة الطلبات، إعدادات العمولة
- **دعم المحفظة**: محفظة داخلية للمستخدمين
- **نظام الإشعارات**: دعم الإشعارات الفورية

## الهيكل المعياري

- `modules/auth`: نظام المصادقة
- `modules/users`: إدارة المستخدمين
- `modules/drivers`: إدارة السائقين ونظام التحقق
- `modules/stores`: إدارة المتاجر والمنتجات
- `modules/orders`: إدارة الطلبات
- `modules/payments`: نظام الدفع
- `modules/notifications`: نظام الإشعارات
- `modules/admin`: لوحة تحكم الأدمن

## قواعد البيانات

- MongoDB Atlas للتخزين
- دعم لتحديد المواقع الجغرافية (GeoJSON)
- مخططات العلاقات بين الكيانات (ERD)

## الإعداد

1. **تثبيت التبعيات**:
   ```bash
   npm install
   ```

2. **إنشاء ملف .env**:
   ```env
   MONGODB_URI=ongodb+srv://<username>:<password>@cluster.mongodb.net/tawseela?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   PAYMOB_INTEGRATION_ID=your_paymob_integration_id
   PAYMOB_IFRAME_ID=your_paymob_iframe_id
   PAYMOB_API_KEY=your_paymob_api_key
   PAYMOB_HMAC=your_paymob_hmac
   FAWRY_API_KEY=your_fawry_api_key
   FAWRY_SECRET=your_fawry_secret
   ```

3. **تشغيل الخادم**:
   ```bash
   npm run dev
   ```

## API Endpoints

### المصادقة
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - الحصول على معلومات المستخدم الحالي
- `PUT /api/auth/me` - تحديث معلومات المستخدم

### المستخدمين
- `GET /api/users` - الحصول على جميع المستخدمين (الأدمن فقط)
- `GET /api/users/:id` - الحصول على مستخدم محدد
- `PUT /api/users/:id` - تحديث مستخدم

### السائقين
- `GET /api/drivers` - الحصول على جميع السائقين
- `PUT /api/drivers/:id/documents` - تحديث وثائق السائق
- `PUT /api/drivers/:id/verify` - تحقق الأدمن من وثائق السائق (الأدمن فقط)
- `GET /api/drivers/pending` - الحصول على السائقين المعلقين (الأدمن فقط)

### المتاجر
- `GET /api/stores` - الحصول على جميع المتاجر
- `POST /api/stores` - إنشاء متجر (مالك المتجر فقط)
- `GET /api/stores/:id` - الحصول على متجر محدد

### الطلبات
- `GET /api/orders` - الحصول على جميع الطلبات (الأدمن فقط)
- `POST /api/orders` - إنشاء طلب جديد (العملاء فقط)
- `PUT /api/orders/:id/status` - تحديث حالة الطلب

### المدفوعات
- `POST /api/payments/process` - معالجة الدفع
- `GET /api/payments/:id` - الحصول على معلومات الدفع

### الإشعارات
- `GET /api/notifications` - الحصول على إشعارات المستخدم
- `PUT /api/notifications/:id/read` - وضع علامة على الإشعار كمقروء

### لوحة تحكم الأدمن
- `GET /api/admin/dashboard` - لوحة التحكم (الأدمن فقط)
- `GET /api/admin/users` - إدارة المستخدمين (الأدمن فقط)
- `GET /api/admin/orders` - إدارة الطلبات (الأدمن فقط)

## نظام Socket.io

- تتبع السائقين في الوقت الفعلي
- إشعارات الطلبات
- تحديثات الحالة الفورية

## مخطط العلاقات بين الكيانات (ERD)

مخطط العلاقات بين الكيانات متاح في ملف `docs/erd.json` و `docs/erd.png`.

## المتطلبات

- Node.js v14 أو أعلى
- MongoDB Atlas
- npm أو yarn

## التوسع

- دعم عدة قرى ومدن
- نظام تحديد المواقع الجغرافي
- تعقب الطلبات في الوقت الفعلي
- دعم وسائل دفع متعددة

## الملفات

- `server.js` - ملف الخادم الرئيسي
- `config/db.js` - إعدادات قاعدة البيانات
- `middleware/auth.js` - مiddleware للمصادقة
- `utils/logger.js` - وحدة تسجيل الأحداث
- `docs/erd.json` - مخطط العلاقات بين الكيانات
- `models/` - نماذج قاعدة البيانات
- `modules/` - وحدات النظام المعيارية

## المطور

تم تطوير هذا النظام كمنصة توصيل متكاملة تدعم السائقين والعملاء والمتاجر في بيئة عربية.

## الرخصة

MIT