import { Routes, Route, Navigate } from "react-router-dom";
import FormLogin from "./pages/FormLogin";
import LandingPageAdmin from "./pages/LandingPageAdmin";
import CustomerPage from "./pages/CustomerPage";
import useAuthStore from "./stores/useAuthStore";
import { useEffect, useState } from "react";
import LandingPageUser from "./pages/LandingPageUser";
import ProtectedRoute from "./ProtectedRoute";
import CustomerForm from "./components/CustomerForm";
import { Toaster } from "react-hot-toast";
import UserPage from "./pages/UserPage";
import UserForm from "./components/UserForm";
import DeleteFormCustomer from "./components/DeleteFormCustomer";
import DeleteFormUser from "./components/DeleteFormUser";
const App = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataCustomer, setDataCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [dataUser, setDataUser] = useState({
    id: "",
    username: "",
    email: "",
    roleName: "",
  });
  const { checkUserLogin, isAuthenticated } = useAuthStore();
  useEffect(() => {
    checkUserLogin();
  }, [checkUserLogin]);
  return (
    <>
      <CustomerForm
        customers={customers}
        setCustomers={setCustomers}
        dataCustomer={dataCustomer}
        setDataCustomer={setDataCustomer}
      />
      <UserForm
        users={users}
        setUsers={setUsers}
        dataUser={dataUser}
        setDataUser={setDataUser}
      />
      <DeleteFormCustomer dataCustomer={dataCustomer} />
      <DeleteFormUser dataUser={dataUser} />
      <Routes>
        {/* logic untuk mengakses element utama, ngecek jika user ada atau tidak jika ada ke landingPage : Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <FormLogin />
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole={["Admin"]}>
              <Routes>
                <Route path="/dashboard" element={<LandingPageAdmin />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRole={["User"]}>
              <Routes>
                <Route path="/dashboard" element={<LandingPageUser />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        {/* untuk mengecek login jika sudah login tidak bisa redirect kelogin */}
        <Route
          path="/customer-page"
          element={
            <CustomerPage
              customers={customers}
              setCustomers={setCustomers}
              setDataCustomer={setDataCustomer}
              // mode={mode}
            />
          }
        />
        <Route
          path="/user-page"
          element={
            <UserPage
              setDataUser={setDataUser}
              dataUser={dataUser}
              users={users}
              setUsers={setUsers}
            />
          }
        />
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </>
  );
};

export default App;
