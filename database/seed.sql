USE campus_clinic_db;

-- 1. Seed Users (passwords here are placeholders; remember to hash in production)
INSERT INTO users (username, email, password_hash, role, full_name) VALUES
('nurse_sarah', 'sarah.nurse@cspc.edu.ph', '$2b$10$wE8Fz7m.ZzW8B9yZgK1nI.gEXAMPLEHASH', 'nurse', 'Sarah Jenkins, RN'),
('dr_reyes', 'm.reyes@cspc.edu.ph', '$2b$10$wE8Fz7m.ZzW8B9yZgK1nI.gEXAMPLEHASH', 'doctor', 'Dr. Manuel Reyes, MD'),
('admin_clinic', 'admin.clinic@cspc.edu.ph', '$2b$10$wE8Fz7m.ZzW8B9yZgK1nI.gEXAMPLEHASH', 'admin', 'Clinic Administrator');

-- 2. Seed Patients
INSERT INTO patients (id_number, patient_type, first_name, last_name, gender, birth_date, department_or_course, contact_number, emergency_contact, emergency_phone) VALUES
('2023-10021', 'student', 'Juan', 'Dela Cruz', 'male', '2003-05-14', 'BS Information Technology', '09171234567', 'Maria Dela Cruz (Mother)', '09181234567'),
('2022-10452', 'student', 'Maria', 'Santos', 'female', '2004-09-22', 'BS Computer Science', '09281234567', 'Jose Santos (Father)', '09291234567'),
('FAC-2018-04', 'faculty', 'Roberto', 'Aquino', 'male', '1985-11-03', 'College of Computer Studies', '09191234567', 'Elena Aquino (Spouse)', '09201234567');

-- 3. Seed Medicines
INSERT INTO medicines (name, category, stock_quantity, unit, expiration_date) VALUES
('Paracetamol 500mg', 'Analgesic / Antipyretic', 250, 'tablets', '2027-12-31'),
('Mefenamic Acid 500mg', 'NSAID / Pain reliever', 120, 'capsules', '2027-08-15'),
('Cetirizine 10mg', 'Antihistamine', 180, 'tablets', '2028-01-20'),
('Amoxicillin 500mg', 'Antibiotic', 60, 'capsules', '2026-11-30'),
('Oral Rehydration Salts', 'Electrolyte', 90, 'sachets', '2027-06-30');
