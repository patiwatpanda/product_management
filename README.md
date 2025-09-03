# ระบบจัดการสินค้าและหมวดหมู่

ระบบจัดการสินค้าและหมวดหมู่ที่พัฒนาด้วย Vue 3 + TypeScript (Frontend) และ Node.js + Express + MongoDB (Backend)

## คุณสมบัติ

### ระบบสินค้า
-  แสดงรายการสินค้าในรูปแบบตาราง
-  เพิ่มสินค้าใหม่ (พร้อมเลือกหมวดหมู่)
-  แก้ไขข้อมูลสินค้า
-  ลบสินค้า (Soft Delete)
-  ค้นหาสินค้า
-  กรองตามหมวดหมู่
-  แสดงสถานะสต็อก
-  Pagination

### ระบบหมวดหมู่
-  แสดงรายการหมวดหมู่ในรูปแบบตาราง
-  เพิ่มหมวดหมู่ใหม่
-  แก้ไขข้อมูลหมวดหมู่
-  ลบหมวดหมู่ (Soft Delete)
- ค้นหาหมวดหมู่
-  Pagination

### ระบบ Validation
-  ตรวจสอบช่องว่าง (Required Fields)
-  ตรวจสอบความยาวของข้อความ
-  ตรวจสอบรูปแบบข้อมูล
-  แสดงข้อความผิดพลาดเป็นภาษาไทย

## โครงสร้างโปรเจค

```
Products_management/
├── Backend/                 # Node.js + Express + MongoDB
│   ├── controllers/         # Business Logic
│   ├── models/             # Database Models
│   ├── routers/            # API Routes
│   ├── app.js              # Main Application
│   └── package.json
├── frontend/               # Vue 3 + TypeScript
│   ├── src/
│   │   ├── views/          # Page Components
│   │   ├── stores/         # Pinia State Management
│   │   ├── services/       # API Services
│   │   ├── router/         # Vue Router
│   │   └── App.vue         # Main Component
│   └── package.json
└── README.md
```

## การติดตั้งและใช้งาน

### 1. ติดตั้ง Backend

```bash
cd Backend
npm install
```

สร้างไฟล์ `.env` ในโฟลเดอร์ Backend:
```env
MONGODB_URI=mongodb://localhost:27017/products_management
PORT=3003
NODE_ENV=development
```

### 2. ติดตั้ง Frontend

```bash
cd frontend
npm install
```

### 3. เริ่มต้น MongoDB

ให้แน่ใจว่า MongoDB กำลังทำงานอยู่:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 4. เริ่มต้น Backend Server

```bash
cd Backend
npm run dev
```

Backend จะทำงานที่: http://localhost:5000

### 5. เริ่มต้น Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend จะทำงานที่: http://localhost:3000

## เทคโนโลยีที่ใช้

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## การใช้งาน

1. **เข้าสู่ระบบ**: เปิดเบราว์เซอร์ไปที่ http://localhost:3000
2. **จัดการหมวดหมู่**: คลิกเมนู "หมวดหมู่" เพื่อเพิ่ม/แก้ไข/ลบหมวดหมู่
3. **จัดการสินค้า**: คลิกเมนู "สินค้า" เพื่อเพิ่ม/แก้ไข/ลบสินค้า
4. **ค้นหา**: ใช้ช่องค้นหาเพื่อหาสินค้าหรือหมวดหมู่
5. **กรอง**: ใช้ dropdown เพื่อกรองสินค้าตามหมวดหมู่


