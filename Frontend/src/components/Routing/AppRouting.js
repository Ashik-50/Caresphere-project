import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DoctorHomePage from '../Doctor/Pages/Homepage1';
import Patients from '../Doctor/Pages/Patients';
import DoctorAppointments from '../Doctor/Pages/Appointments';
import ConHis from '../Doctor/Pages/ConHis';

import AdminHomePage from '../Admin/Pages/HomePage';
import DoctorsPage from '../Admin/Pages/DoctorsPage';
import Users from '../Admin/Pages/Users';
import AddDoctor from '../Admin/Pages/AddDoctor';

import CallHome from '../User/Pages/Home/CallHome';
import EmergencyPage from '../User/Pages/Emergency/EmergencyPage';
import SignupPage from '../User/Pages/Loginandsignup/Signup';
import Doctor from '../User/Pages/Doctors/Doctor';
import AppointmentsPage from '../User/Pages/Appointments/AppointmentPage';
import UserDetails from '../User/Pages/Loginandsignup/UserDetails';
import Login from '../User/Pages/Loginandsignup/Login'
import AuthGuard from '../User/Pages/Loginandsignup/AuthGuard';
import EmergencySteps from '../User/Pages/Emergency/EmergencySteps';
import MyAccount from '../User/Pages/Home/MyAccount';
import Reports from '../User/Pages/Appointments/Report';

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<CallHome />} />
      <Route path="/emergencysteps" element={<EmergencySteps />} />
      <Route path="/doctors" element={<AuthGuard><Doctor /></AuthGuard>} />
      <Route path="/appointments" element={<AuthGuard><AppointmentsPage /></AuthGuard>} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/userdetails" element={<AuthGuard><UserDetails /></AuthGuard>} />
      <Route path="/account" element={<AuthGuard><MyAccount /></AuthGuard>} />
      <Route path="/report" element={<AuthGuard><Reports /></AuthGuard>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/doctor/home" element={<AuthGuard><DoctorHomePage /></AuthGuard>} />
      <Route path="/doctor/pat" element={<AuthGuard><Patients /></AuthGuard>} />
      <Route path="/doctor/app" element={<AuthGuard><DoctorAppointments /></AuthGuard>} />
      <Route path="/doctor/his" element={<AuthGuard><ConHis /></AuthGuard>} />
      <Route path="/doctor/logout" element={<Login />} />

      <Route path="/admin/home" element={<AuthGuard><AdminHomePage /></AuthGuard>} />
      <Route path="/admin/doc" element={<AuthGuard><DoctorsPage /></AuthGuard>} />
      <Route path="/admin/add" element={<AuthGuard><AddDoctor /></AuthGuard>} />
      <Route path="/admin/user" element={<AuthGuard><Users /></AuthGuard>} />
      <Route path="/admin/logout" element={<Login />} />
    </Routes>
  );
};

export default AppRouting;