# Campus Clinic Management System (Round 1)

An automated web portal and clinical records management system developed for campus healthcare services using Node.js, Express, and MySQL.

---

## 1. Project Description
The **Campus Clinic Management System** streamlines university healthcare workflows by providing centralized patient health records, vital signs consultation logs, pharmaceutical inventory tracking, and automated excuse/clearance certificate generation for students, faculty, and university personnel.

---

## 2. Team Members & Primary Responsibilities
* **Cris Ivan M. Nual** – Database Modeling, System Architecture & Core Backend (Relational Schema, MySQL Connection Pooling, Password Encryption, Session Management, Route Guards, and Data Models)
* **April Peñones** – Clinical Documentation & Medical Profile UI (Patient Clinical Profile View, Printable Medical Certificate Generator, `@media print` Stylesheets, and Consultation Vitals Interface)
* **Jasmine Baldoza** – Patient Intake, Form Validation & Real-Time Filtering (Patient Intake Forms, Duplicate ID Validation Alerts, Client-Side Live Search Engine, and Classification Filter Pills)
* **Kyle Martirez** – Pharmacy Stock Management & Analytics Dashboard (Clinic KPI Dashboard Counters, Metric Aggregation Controllers, Medicine Inventory Tracking, and Stock Restock/Dispense Handlers)
---

## 3. Assigned System
* **Domain:** Campus Clinic Management System
* **Target Users:** Campus Nurses, University Physicians, Clinic Administrators, Students, Faculty, and Staff.

---

## 4. Key Features
* **Authentication & Access Control:** Session persistence via `express-session`, password hashing using `bcryptjs`, and route guards blocking unauthorized URL tampering.
* **Clinic Analytics Dashboard:** Real-time counters for total enrolled patients, daily consultation counts, total visits, and low-stock pharmacy warnings.
* **Patient Intake & Medical Records:** Full directory with instant client-side search, classification filtering (Students, Faculty, Staff), and form validation against duplicate university IDs.
* **Clinical Consultation & Vitals Logging:** Captures vital signs (Blood Pressure, Body Temperature, Pulse Rate), chief complaints, clinical diagnoses, and attending practitioner attribution.
* **Direct Pharmacy Inventory Dispensing:** In-stock medication selection with automatic stock deduction directly in MySQL upon consultation recording.
* **Printable Medical Certificate:** Generates formal excuse slips and clearance documentation with print CSS rules (`@media print`) for clean one-page PDF/hardcopy export.

---

## 5. Technology Stack
* **Runtime:** Node.js (v24+)
* **Backend Framework:** Express.js
* **Template Engine:** EJS (Embedded JavaScript)
* **Styling & UI:** Bootstrap 5, Bootstrap Icons
* **Database Engine:** MySQL / MariaDB (via XAMPP)
* **Database Client:** `mysql2/promise` (Connection Pooling)
* **Authentication & Security:** `express-session`, `bcryptjs`, `dotenv`
* **Version Control:** Git, GitHub (Feature Branches, Pull Requests, Conventional Commits, Projects Board)

---

## 6. Project Directory Structure
```text
campus-system/
├── config/
│   └── db.js                 # MySQL connection pool configuration
├── controllers/
│   ├── authController.js     # Session login & logout handling
│   ├── dashboardController.js# Statistical metric queries
│   ├── medicineController.js # Pharmacy CRUD & stock adjustment
│   └── patientController.js  # Patient profiles, visits & certs
├── database/
│   ├── schema.sql            # Table definitions (users, patients, visits, medicines)
│   └── seed.sql              # Initial test data
├── middleware/
│   └── auth.js               # Route guards (requireAuth, requireRole)
├── models/
│   ├── Medicine.js           # Inventory database queries
│   ├── Patient.js            # Patient demographic & visit history queries
│   └── Visit.js              # Consultation logs & join queries
├── public/
│   ├── css/
│   └── js/
├── routes/
│   ├── authRoutes.js         # Authentication endpoints (/login, /logout)
│   ├── dashboardRoutes.js    # Metric dashboard endpoint (/dashboard)
│   ├── medicineRoutes.js     # Inventory endpoints (/medicines)
│   └── patientRoutes.js      # Patient & consultation endpoints (/patients)
├── views/
│   ├── auth/
│   │   └── login.ejs         # Medical personnel login screen
│   ├── dashboard/
│   │   └── index.ejs         # Central analytics dashboard
│   ├── medicines/
│   │   └── index.ejs         # Pharmacy directory & restock modal
│   ├── partials/
│   │   ├── footer.ejs        # Global page footer
│   │   └── header.ejs        # Global navbar with role badges
│   ├── patients/
│   │   ├── index.ejs         # Directory table with real-time filters
│   │   ├── new.ejs           # Patient registration intake form
│   │   └── show.ejs          # Clinical profile & consultation modal
│   └── visits/
│       └── certificate.ejs   # Print-ready medical excuse certificate
├── .env.example              # Environment variables template
├── .gitignore                # Excludes node_modules/ and .env
├── app.js                    # Application server entry point
├── LICENSE                   # MIT License
├── package.json              # Project dependencies & metadata
├── README.md                 # Project documentation
└── REQUIREMENTS.md           # Formal software requirements specification