# 🚦 ANPR & ATCC Smart Traffic Management System

## Complete Smart City Traffic Control Platform

A professional-grade traffic management system featuring **Automatic Number Plate Recognition (ANPR)** and **Automated Traffic Control Center (ATCC)** capabilities, built with React, Motion (Framer Motion), Recharts, and Supabase.

---

## ✨ Key Features

### 🎨 **Modern Light Theme Design**
- Clean, bright interface with soft gradients (blue-50 to indigo-50)
- Professional white cards with subtle shadows
- Excellent readability and contrast
- Beautiful color-coded statistics and charts

### 🎬 **Selective 3D Animations**
- Smooth card hover effects with 3D depth
- Animated gradient backgrounds
- Interactive bounding boxes on CCTV feeds
- Floating particle effects
- Tab transitions and button interactions
- **Only where it enhances UX** - no overwhelming animations

### 📊 **7 Complete Pages**

#### 1. **Login/Signup Page**
- Animated background with floating particles
- 3D card lift effect
- Smooth tab switching between Sign In/Sign Up
- Password visibility toggle
- Remember me functionality

#### 2. **Main Dashboard**
- Real-time statistics cards with 3D hover
- Interactive charts (Line, Pie, Bar)
- Recent violations table
- Vehicle category breakdown
- Live traffic density indicators

#### 3. **Live Monitoring**
- Real-time CCTV feed simulation
- Animated detection bounding boxes
- Multi-camera switcher
- Live detection panel with confidence scores
- Violation alerts with visual indicators

#### 4. **Violations Management**
- Comprehensive violation records
- Advanced filtering and search
- Status tracking (Pending/Paid/Under Review)
- Export functionality
- Pagination support

#### 5. **Analytics Dashboard**
- AI model performance comparison
- Day vs Night traffic analysis
- Monthly traffic trends
- Performance metrics radar chart
- System uptime and response time stats

#### 6. **Vehicle Search**
- License plate search functionality
- Complete vehicle history
- Detection timeline
- Violation records
- Confidence scores

#### 7. **Map View**
- Interactive traffic heat zones
- Camera location markers
- Real-time traffic density
- Zone-based filtering
- Live status indicators

---

## 🔌 **Supabase Backend Integration**

### **API Endpoints**

#### Authentication
- `POST /auth/signup` - Create new user account

#### Violations
- `GET /violations` - Get all violations
- `POST /violations` - Create new violation
- `PATCH /violations/:id` - Update violation status

#### Vehicle Detection
- `POST /detections` - Log vehicle detection
- `GET /detections/recent?limit=50` - Get recent detections

#### Vehicle Search
- `GET /vehicles/search?plate=ABC1234` - Search by plate number

#### Analytics
- `GET /analytics/stats` - Get dashboard statistics
- `GET /analytics/hourly` - Get hourly traffic data

#### Camera Management
- `GET /cameras/status` - Get all camera statuses
- `PATCH /cameras/:id` - Update camera status

---

## 🗄️ **Data Storage**

The system uses Supabase's KV (Key-Value) store for flexible data management:

### **Data Prefixes**
- `violation:` - Violation records
- `detection:` - Vehicle detection logs
- `camera:` - Camera status and configuration

### **Auto-Seeding**
On first load, the system automatically seeds the database with:
- 5+ sample violations
- 8+ sample vehicle detections
- 4 camera configurations

---

## 🎯 **Key Technologies**

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Motion (Framer Motion)** - 3D animations
- **Recharts** - Data visualization
- **Tailwind CSS v4** - Utility-first styling
- **React Router** - Navigation
- **Supabase** - Backend & Database
- **Lucide React** - Beautiful icons

---

## 🚀 **Getting Started**

### **Login**
1. Navigate to the login page
2. Click "Sign Up" to create an account
3. Or click "Sign In" to access the dashboard

### **Dashboard Navigation**
- Use the sidebar to navigate between pages
- Sidebar can be collapsed using the toggle button
- All pages feature smooth transitions

### **Using Live Monitoring**
1. Go to "Live Monitoring" from sidebar
2. Select different cameras using the camera selector
3. View real-time detections in the right panel
4. Violations are highlighted in red

### **Searching Vehicles**
1. Navigate to "Vehicle Search"
2. Enter a license plate number
3. View complete history including:
   - All detections
   - Violation records
   - Timestamps and locations

---

## 🎨 **Design System**

### **Colors**
- **Primary**: Blue-600, Indigo-600
- **Success**: Green-500, Emerald-600
- **Warning**: Orange-500, Yellow-600
- **Danger**: Red-500, Red-600
- **Info**: Purple-500, Pink-600

### **Typography**
- **Font Family**: Inter (system default)
- **Headings**: Bold, Gray-900
- **Body**: Medium, Gray-700
- **Labels**: Semibold, Gray-600

### **Shadows**
- Cards: `shadow-lg`
- Hover: `shadow-xl` with blue tint
- Icons: `shadow-lg` on gradients

---

## 📱 **Responsive Design**

- **Desktop**: Full-featured layout
- **Tablet**: Adaptive grid system
- **Mobile**: Collapsible sidebar, stacked cards

---

## ⚡ **Performance Features**

- Component code splitting
- Lazy loading for charts
- Optimized animations (GPU accelerated)
- Efficient re-renders with React hooks
- LocalStorage for seed tracking

---

## 🔒 **Security**

- JWT-based authentication (Supabase)
- Service role key protected on backend
- CORS enabled for API access
- Input validation on all forms
- Secure password handling

---

## 📈 **Future Enhancements**

- Real-time WebSocket updates
- Advanced AI model integration
- Mobile app version
- Email notifications
- PDF report generation
- Advanced filtering options
- Multi-language support

---

## 🛠️ **Development**

### **Project Structure**
```
/src/app/
  ├── pages/           # All 7 pages
  ├── components/      # Reusable components
  ├── services/        # API client
  ├── utils/           # Utilities & seed data
  └── routes.ts        # Router configuration

/supabase/functions/server/
  └── index.tsx        # Backend API
```

### **API Client Usage**
```typescript
import { violationsApi } from './services/api';

// Get all violations
const violations = await violationsApi.getAll();

// Create new violation
await violationsApi.create({
  plate: "ABC 1234",
  type: "Speeding",
  ...
});
```

---

## 📞 **Support**

For issues or questions:
1. Check the browser console for errors
2. Verify Supabase connection
3. Ensure auto-seeding completed
4. Clear localStorage and refresh if needed

---

## ✅ **System Status**

- ✅ Light theme with beautiful gradients
- ✅ Selective 3D animations (smooth & purposeful)
- ✅ 7 fully functional pages
- ✅ Supabase backend connected
- ✅ Auto-seeding on first load
- ✅ Responsive design
- ✅ Real-time statistics
- ✅ Interactive charts
- ✅ Professional UI/UX

---

**Built for Smart Cities | Government-Grade Traffic Management**

Version 2.0.1 | Smart City Division
