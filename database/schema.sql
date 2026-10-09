CREATE DATABASE IF NOT EXISTS campus_clinic_db;
USE campus_clinic_db;

-- 1. Users table (Nurses, Doctors, Staff, Admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'nurse', 'doctor') DEFAULT 'nurse',
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Patients table (Students, Faculty, Staff)
CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_number VARCHAR(50) NOT NULL UNIQUE,
  patient_type ENUM('student', 'faculty', 'staff') NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  gender ENUM('male', 'female', 'other') NOT NULL,
  birth_date DATE NULL,
  department_or_course VARCHAR(100) NULL,
  contact_number VARCHAR(20) NULL,
  emergency_contact VARCHAR(100) NULL,
  emergency_phone VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Clinic Visits / Consultations table
CREATE TABLE IF NOT EXISTS visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  attending_user_id INT NULL,
  visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  blood_pressure VARCHAR(20) NULL,
  temperature DECIMAL(4, 1) NULL,
  pulse_rate INT NULL,
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT NULL,
  treatment TEXT NULL,
  remarks TEXT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (attending_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Medicine Inventory table
CREATE TABLE IF NOT EXISTS medicines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NULL,
  stock_quantity INT DEFAULT 0,
  unit VARCHAR(20) DEFAULT 'pieces',
  expiration_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
