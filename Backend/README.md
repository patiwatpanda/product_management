#  Products Management API

API ที่ครอบคลุมสำหรับการจัดการสินค้า หมวดหมู่ และผู้ใช้ สร้างด้วย Node.js, Express.js และ MongoDB

ก่อนที่จะรันแอปพลิเคชันนี้ ต้องแน่ใจว่าคุณได้ติดตั้งสิ่งต่อไปนี้แล้ว:

- **Node.js** (เวอร์ชัน 14 หรือสูงกว่า)
- **npm** หรือ **yarn**
- **MongoDB** (เวอร์ชัน 4.4 หรือสูงกว่า)
- **Git**

### ตรวจสอบเวอร์ชันของคุณ:

```bash
node --version
npm --version
mongod --version
```
## 📦 การติดตั้ง

1. **โคลน repository**
   ```bash
   git clone  https://github.com/patiwatpanda/product_management.git
   cd Products_management/Backend
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **สร้างไฟล์ environment**
   ```bash
   # สร้างไฟล์ .env ในโฟลเดอร์หลัก
   touch .env
   ```

4. **ตั้งค่า environment variables**
   ```bash
   # คัดลอกและแก้ไขการตั้งค่าตัวอย่าง
   cp .env.example .env
   ```

# การตั้งค่า

### Environment Variables (.env)

สร้างไฟล์ `.env` ในโฟลเดอร์หลักด้วยตัวแปรต่อไปนี้:

```env
# Server Configuration
PORT=3003
NODE_ENV=development

# Database Configuration
<!-- ต้องลง Mongodbที่เครื่องตัวเองแล้วนำ port มา set ไว้ที่ ENV -->
MONGODB_URI=mongodb://localhost:27017/products_management
#หรือ เป็นฐานข้อมูล ตัวทดสอบฟรีที่ผมสร้างไว้ทดสอบได่เลย
<!-- MONGODB_URI=mongodb+srv://dbuser:admin123@management.ryvwcbk.mongodb.net/?retryWrites=true&w=majority&appName=Management -->

# JWT Configuration (if needed later)
JWT_SECRET=your_jwt_secret_key_here

## 🚀 การใช้งาน

### โหมดการพัฒนา
# เริ่มต้นด้วย nodemon (รีสตาร์ทอัตโนมัติเมื่อไฟล์เปลี่ยนแปลง)
npm run dev
### โหมด production
npm start
### สคริปต์ที่มีอยู่
```bash
npm run dev      # เริ่มต้นเซิร์ฟเวอร์การพัฒนาด้วย nodemon
npm start        # เริ่มต้นเซิร์ฟเวอร์การผลิต
npm test         # รันการทดสอบ (หากมีการตั้งค่า)
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3003/api
```
### ตัวอย่างการค้นหา
**Products Endpoints ตัวอย่าง**

- GET    http://localhost:3003/api/products/products         // ดึงข้อมูลสินค้าทั้งหมด
- GET    http://localhost:3003/api/products/products/:id     // ดึงข้อมูลสินค้าตามไอดี
- POST   http://localhost:3003/api/products/products         // เพิ่มสินค้าใหม่
- PUT    http://localhost:3003/api/products/products/:id     // แก้ไขข้อมูลสินค้าตามไอดี
- DELETE http://localhost:3003/api/products/products/:id     // ลบสินค้าตามไอดี

**Category Endpoints ตัวอย่าง**

- GET    http://localhost:3003/api/catagory/catagory         // ดึงข้อมูลหมวดหมู่ทั้งหมด
- GET    http://localhost:3003/api/catagory/catagory/:id     // ดึงข้อมูลหมวดหมู่ตามไอดี
- POST   http://localhost:3003/api/catagory/catagory         // เพิ่มหมวดหมู่ใหม่
- PUT    http://localhost:3003/api/catagory/catagory/:id     // แก้ไขข้อมูลหมวดหมู่ตามไอดี
- DELETE http://localhost:3003/api/catagory/catagory/:id     // ลบหมวดหมู่ตามไอดี





