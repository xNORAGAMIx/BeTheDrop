import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import io from "socket.io-client";

import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Donor from "./pages/dashboard/Donor";
import Hospital from "./pages/dashboard/Hospital";
import Organisation from "./pages/dashboard/Organisation";
import Consumer from "./pages/dashboard/Donations";
import Donation from "./pages/Donation";
import Analytics from "./pages/dashboard/Analytics";
import DonorList from "./pages/admin/DonorList";
import HospitalList from "./pages/admin/HospitalList";
import OrgList from "./pages/admin/OrganisationList";
import AdminHome from "./pages/admin/AdminHome";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Inventory from "./pages/dashboard/Inventory";
import Donations from "./pages/dashboard/Donations";
import Transfer from "./pages/dashboard/Transfer";
import Alert from "./pages/dashboard/Alert";
import AlertResponses from "./pages/dashboard/AlertResponses";
import AlertDonor from "./pages/AlertDonor";
import Test from "./pages/dashboard/Test";
import AlertInfo from "./pages/dashboard/AlertInfo";
import DonorResponses from "./pages/dashboard/DonorResponses";
import AddHopital from "./pages/admin/AddHopital";

const App = () => {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Connected to socket server:", socket.id);
  });

  socket.on("connected", (msg) => {
    console.log("Message from server:", msg);
  });

  useEffect(() => {
    socket.on("new-alert", (data) => {
      toast.error(data);
      return;
    });

    return () => {
      socket.off("new-alert");
    };
  }, [socket]);
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-list"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blood"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <Organisation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDonation"
          element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/alert"
          element={
            <ProtectedRoute>
              <Alert />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alert/:id"
          element={
            <ProtectedRoute>
              <AlertResponses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor-alerts"
          element={
            <ProtectedRoute>
              <AlertDonor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor-alerts/:id"
          element={
            <ProtectedRoute>
              <AlertInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor-responses"
          element={
            <ProtectedRoute>
              <DonorResponses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addHospital"
          element={
            <ProtectedRoute>
              <AddHopital />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
