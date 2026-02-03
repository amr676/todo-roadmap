import { 
  Terminal, 
  Database, 
  Layout, 
  Shield, 
  Server, 
  Key 
} from 'lucide-react';

export const steps = [
  {
    id: 0,
    category: "0. التأسيس (Setup & Installation)",
    icon: Terminal,
    files: [
      {
        name: "Terminal / CMD",
        hint: "💻 البداية من هنا: دي الأوامر اللي هتكتبها في الشاشة السوداء (Terminal) عشان تنزل الأدوات.",
        description: "أوامر إنشاء المشروع وتثبيت المكتبات.",
        code: `# 1. إنشاء المجلد والدخول إليه
mkdir my-todo-app
cd my-todo-app

# 2. تجهيز ملف package.json (جواز السفر)
npm init -y

# 3. تنزيل المكتبات الأساسية (الطبخة بتاعتنا)
npm install express sequelize pg pg-hstore dotenv cors helmet bcryptjs jsonwebtoken

# 4. تنزيل مكتبة للتطوير (عشان السيرفر يعمل ريستارت لوحده لما نعدل كود)
npm install -D nodemon`,
        explanation: [
          "npm init -y: بيعمل ملف package.json بالإعدادات الافتراضية.",
          "express: المحرك الأساسي للسيرفر.",
          "sequelize & pg: عشان نكلم قاعدة البيانات PostgreSQL.",
          "nodemon: مساعد ذكي بيعمل Refresh للسيرفر تلقائي."
        ]
      },
      {
        name: "package.json",
        hint: "📦 جواز السفر: ملف فيه اسم المشروع، الإصدار، وأوامر التشغيل (Scripts).",
        description: "ملف إعدادات المشروع والمكتبات.",
        code: `{
  "name": "my-todo-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}`,
        explanation: [
          "scripts: هنا بنعرف اختصارات التشغيل.",
          "npm run dev: الأمر اللي هنستخدمه طول ما احنا شغالين عشان يشغل nodemon.",
          "dependencies: قايمة بكل المكتبات اللي نزلناها."
        ]
      }
    ]
  },
  {
    id: 1,
    category: "1. الإعدادات (Configuration)",
    icon: Database,
    files: [
      {
        name: ".env",
        hint: "🔐 صندوق الأسرار: هنا بنخبي الباسوردات واسم الداتابيز عشان الأمان.",
        description: "ملف المتغيرات البيئية. لا يتم رفعه على GitHub أبداً.",
        code: `PORT=3000
NODE_ENV=development

# إعدادات قاعدة البيانات
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db

# إعدادات التشفير (JWT)
JWT_SECRET=super_secret_key_12345
JWT_EXPIRES_IN=7d`,
        explanation: [
          "PORT: المنفذ اللي السيرفر هيشتغل عليه.",
          "DB_*: بيانات الاتصال بقاعدة البيانات اللي عملتها في pgAdmin.",
          "JWT_SECRET: المفتاح الخاص اللي السيرفر بيوقع بيه على التوكنات (زي ختم النسر)."
        ]
      },
      {
        name: "src/config/database.js",
        hint: "🔌 كوبري الاتصال: الكود اللي بيربط Node.js بالداتابيز باستخدام Sequelize.",
        description: "إعداد مكتبة Sequelize للاتصال بقاعدة البيانات.",
        code: `const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // عشان ميزعجناش بتفاصيل الـ SQL في الكونسول
  }
);

module.exports = sequelize;`,
        explanation: [
          "Sequelize: المكتبة اللي بتخلينا نكتب JS بدل SQL.",
          "process.env: بنقرا البيانات من ملف .env اللي فوق.",
          "dialect: بنحدد نوع الداتابيز (postgres)."
        ]
      }
    ]
  },
  {
    id: 2,
    category: "2. هيكل البيانات (Models)",
    icon: Layout,
    files: [
      {
        name: "src/models/User.js",
        hint: "👤 بطاقة الهوية + التشفير: شكل بيانات المستخدم وكود تشفير الباسورد.",
        description: "جدول المستخدمين في قاعدة البيانات.",
        code: `const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  hooks: {
    // 🪝 Hook: خطوة سحرية بتتم قبل الحفظ
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

// دالة لمقارنة الباسورد وقت الدخول
User.prototype.comparePassword = async function(pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = User;`,
        explanation: [
          "DataTypes.UUID: بنستخدم أرقام عشوائية طويلة للـ ID عشان الأمان.",
          "Hooks (beforeCreate): كود بيشتغل أوتوماتيك قبل ما اليوزر يتحفظ في الداتابيز عشان يشفر الباسورد.",
          "comparePassword: دالة بنستدعيها وقت الـ Login عشان نتأكد إن الباسورد صح."
        ]
      },
      {
        name: "src/models/Todo.js",
        hint: "✅ ورقة المهمة: عنوان المهمة وحالتها (خلصت ولا لسه).",
        description: "جدول المهام (To-Do Items).",
        code: `const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  isCompleted: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  }
});

module.exports = Todo;`,
        explanation: [
          "title: عنوان المهمة (إجباري).",
          "isCompleted: حالة المهمة، بتبدأ بـ false (غير مكتملة)."
        ]
      },
      {
        name: "src/models/index.js",
        hint: "🔗 الخاطبة: بتربط الجداول ببعضها (اليوزر عنده مهام، المهمة تبع يوزر).",
        description: "تجميع العلاقات بين الجداول.",
        code: `const sequelize = require('../config/database');
const User = require('./User');
const Todo = require('./Todo');

// تعريف العلاقات
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Todo };`,
        explanation: [
          "hasMany: المستخدم الواحد يقدر يكون عنده مهام كتير.",
          "belongsTo: المهمة الواحدة لازم تكون مملوكة لمستخدم واحد."
        ]
      }
    ]
  },
  {
    id: 3,
    category: "3. الحماية (Middlewares)",
    icon: Shield,
    files: [
      {
        name: "src/middlewares/authMiddleware.js",
        hint: "🛡️ البودي جارد: بيقف عالباب، يتأكد من التوكن، ويدخل اليوزر.",
        description: "التحقق من صحة الـ JWT Token.",
        code: `const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1. بندور على التوكن في الهيدر
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) throw new Error('Not authorized');

    // 2. بنفك التشفير
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. بنجيب بيانات اليوزر ونخزنها في الطلب
    req.user = await User.findByPk(decoded.id);
    
    next(); // اتفضل ادخل
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};`,
        explanation: [
          "req.headers.authorization: المكان اللي التوكن بيتبعت فيه.",
          "jwt.verify: التأكد إن التوكن سليم ومش مزور.",
          "req.user: أهم سطر! بنخزن بيانات اليوزر عشان نستخدمها بعدين في الكنترولر."
        ]
      },
      {
        name: "src/middlewares/errorHandler.js",
        hint: "🚨 شبكة الأمان: بتصطاد أي خطأ وتطلع رسالة شيك لليوزر.",
        description: "معالجة الأخطاء الموحدة.",
        code: `const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
};

module.exports = errorHandler;`,
        explanation: [
          "مكان واحد بنجمع فيه كل الأخطاء بدل ما السيرفر يقع.",
          "بيرجع JSON فيه تفاصيل الخطأ."
        ]
      }
    ]
  },
  {
    id: 4,
    category: "4. المنطق (Controllers)",
    icon: Server,
    files: [
      {
        name: "src/controllers/authController.js",
        hint: "🔑 موظف الاستقبال: تسجيل دخول وخروج، وتسليم المفاتيح (Tokens).",
        description: "التحكم في عمليات المصادقة.",
        code: `const { User } = require('../models');
const jwt = require('jsonwebtoken');

// دالة لعمل التوكن
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user.id);
    res.status(201).json({ token, user });
  } catch (err) { next(err); }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    // التأكد من الباسورد
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    
    const token = signToken(user.id);
    res.status(200).json({ token, user });
  } catch (err) { next(err); }
};`,
        explanation: [
          "signup: بيعمل يوزر جديد ويعطيه توكن.",
          "signin: بيدور على اليوزر، يتأكد من الباسورد، ويعطيه توكن."
        ]
      },
      {
        name: "src/controllers/todoController.js",
        hint: "📝 مدير المهام: إضافة، عرض، وحذف المهام الخاصة بالمستخدم.",
        description: "التحكم في الـ Todo Items.",
        code: `const { Todo } = require('../models');

exports.createTodo = async (req, res, next) => {
  try {
    // أهم نقطة: ربط المهمة باليوزر الحالي (req.user.id)
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id 
    });
    res.status(201).json({ todo });
  } catch (err) { next(err); }
};

exports.getMyTodos = async (req, res, next) => {
  try {
    // جلب المهام الخاصة بهذا المستخدم فقط
    const todos = await Todo.findAll({ 
      where: { userId: req.user.id } 
    });
    res.json({ todos });
  } catch (err) { next(err); }
};`,
        explanation: [
          "createTodo: بياخد بيانات المهمة ويضيف عليها userId اللي جبناه من التوكن.",
          "getMyTodos: بيعمل فلتر (where) عشان يجيب بس الحاجات اللي تخص اليوزر ده."
        ]
      }
    ]
  },
  {
    id: 5,
    category: "5. الروابط (Routes)",
    icon: Key,
    files: [
      {
        name: "src/routes/authRoutes.js",
        hint: "🚪 البوابات العامة: أي حد يقدر يدخل هنا (عشان يسجل أو يعمل login).",
        description: "روابط المصادقة.",
        code: `const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;`,
        explanation: [
          "POST /signup: رابط التسجيل.",
          "POST /signin: رابط الدخول."
        ]
      },
      {
        name: "src/routes/todoRoutes.js",
        hint: "🚧 المنطقة المحظورة: لازم يكون معاك تصريح (Token) عشان تعدي.",
        description: "روابط المهام المحمية.",
        code: `const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { protect } = require('../middlewares/authMiddleware');

// 🛡️ تفعيل الحماية لكل الروابط اللي جاية
router.use(protect);

router.post('/', todoController.createTodo);
router.get('/', todoController.getMyTodos);

module.exports = router;`,
        explanation: [
          "router.use(protect): أي رابط تحت السطر ده، لازم يعدي على البودي جارد الأول.",
          "فبالتالي مستحيل حد يضيف مهمة من غير ما يكون مسجل دخول."
        ]
      },
      {
        name: "src/routes/index.js",
        hint: "🌐 المحطة الرئيسية: بتوزع الطلبات على الملفات الفرعية.",
        description: "تجميع كل الروابط.",
        code: `const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/auth', authRoutes); // /api/auth
router.use('/todos', todoRoutes); // /api/todos

module.exports = router;`,
        explanation: [
          "بيجمع ملفات الروابط في مكان واحد عشان نستخدمها في app.js."
        ]
      }
    ]
  },
  {
    id: 6,
    category: "6. التجميع والتشغيل",
    icon: Key,
    files: [
      {
        name: "src/app.js",
        hint: "🥣 المطبخ: بنخلط كل المكونات (حماية + روابط + معالجة أخطاء).",
        description: "تجهيز تطبيق Express.",
        code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet()); // خوذة الأمان
app.use(cors());   // السماح بالاتصال الخارجي
app.use(express.json()); // فهم الـ JSON

app.use('/api', routes); // تركيب الروابط
app.use(errorHandler);   // تركيب معالج الأخطاء

module.exports = app;`,
        explanation: [
          "helmet: بيحمي السيرفر من ثغرات معروفة.",
          "cors: بيسمح للفرونت إند (React مثلاً) إنه يكلم الباك إند.",
          "app.use('/api'): بيخلي كل الروابط تبدأ بكلمة /api."
        ]
      },
      {
        name: "server.js",
        hint: "🚀 زر الإطلاق: بيوصل الداتابيز ويشغل السيرفر.",
        description: "نقطة بداية التشغيل.",
        code: `require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // بناء الجداول في الداتابيز
    await sequelize.sync({ alter: true });
    console.log('✅ Database Synced');
    
    app.listen(PORT, () => {
      console.log(\`🚀 Server running on port \${PORT}\`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();`,
        explanation: [
          "sequelize.sync: بيبص على ملفات الـ Models ويروح يعمل الجداول في الداتابيز لو مش موجودة.",
          "app.listen: بيبدأ يستقبل الطلبات من المستخدمين."
        ]
      }
    ]
  }
];
