import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Admindashb from "./pages/admin/Admindashb";
import AdminInsert from "./pages/admin/AdminInsert";
import Landing from "./pages/Landing";
import Navbar from "./pages/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./pages/Cart";
import PrivateRoute from "./pages/PrivateRoute";
import AdminEditPage from "./pages/admin/AdminEditPage";
import Footer from "./pages/Footer";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />

        {/* Protected Routes (Require Login) */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admindashb" element={<Admindashb />} />
          <Route path="/admininsert" element={<AdminInsert />} />
          <Route path="/edit/:id" element={<AdminEditPage />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;
