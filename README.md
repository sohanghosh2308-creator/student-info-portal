# 🎓 Student Information Management System (React 19)

A dynamic, ultra-modern academic portal built in React enforcing component reusability, prop-driven data flow, interactive state manipulation (add/remove), immutable CGPA sorting, and glassmorphism visual effects.

---

## 🏛️ Component Architecture & Hierarchy

```
App (src/App.jsx)
 │
 ├── Header (src/components/Header.jsx)
 │    ├── Branding & Live Statistics (Enrolled, Avg CGPA, Dean's List)
 │    ├── Real-Time Search Filter
 │    ├── CGPA Sort Selector (Highest/Lowest)
 │    └── Add Student Action Button
 │
 ├── StudentList (src/components/StudentList.jsx)
 │    ├── StudentCard (src/components/StudentCard.jsx) [Map / Reusable]
 │    │    ├── Student Avatar with Fallback
 │    │    ├── Name & Academic Information
 │    │    ├── CGPA Pill Badge with Dynamic Shimmer
 │    │    └── Remove Button Callback
 │    └── Empty State Card (when all records deleted)
 │
 ├── AddStudentModal (src/components/AddStudentModal.jsx)
 │    ├── Interactive Form with Validation
 │    ├── Quick Avatar Presets & Initials Badge Generator
 │    └── Real-time Live Preview Card
 │
 ├── Toast (src/components/Toast.jsx)
 └── Footer (src/components/Footer.jsx)
```

---

## ✨ Features & Assignment Checklist

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Required Components** | ✅ **100% Complete** | `App.jsx`, `StudentList.jsx`, `StudentCard.jsx`, `Header.jsx`, `Footer.jsx` |
| **Data Flow via Props** | ✅ **100% Prop-Driven** | All attributes (`name`, `rollNo`, `department`, `semester`, `cgpa`, `photo`, `onRemove`) passed cleanly from parent to child components |
| **Add & Remove Records** | ✅ **Fully Interactive** | Managed via React `useState` hooks with immutable array updates (`addStudent`, `removeStudent`) |
| **CGPA Sorting** | ✅ **Implemented** | Immutable sorting dropdown: Highest-to-Lowest (`cgpa-desc`) and Lowest-to-Highest (`cgpa-asc`) on a **10.0 scale** |
| **Sample Dataset** | ✅ **Pre-populated** | Includes Alex Morgan (9.62), Elena Rostova (9.80), Marcus Vance (8.65), and Priya Sharma (9.45) |
| **Theme & Aesthetic** | ✅ **White & Crimson Red** | Clean pearl white background with subtle red grid alignment, crimson top ribbon, and crisp white cards |
| **Glassmorphism & Cards** | ✅ **Refined** | Modern frosted white glass cards, red gradient top accents, and smooth elevation hover transitions |
| **Avatar Fallbacks** | ✅ **Robust** | Automated SVG avatar generator if image links fail or are omitted |

---

## 🚀 Getting Started in VS Code

### 1. Open in VS Code
Open your terminal or command prompt and run:
```bash
code "C:\Users\Argya\Desktop\student-info-portal"
```
Or in VS Code: **File > Open Folder** and select `student-info-portal` on your Desktop.

### 2. Start Development Server
In the VS Code integrated terminal (`Ctrl + \``):
```bash
npm run dev
```

### 3. Open in Browser
Click on the local URL shown in your terminal (typically `http://localhost:5173`) to view the live portal!

---

## 📦 Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.
