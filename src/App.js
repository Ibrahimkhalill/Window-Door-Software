import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { AuthProvider} from './page/authentication/Auth';

import { AuthProvider, useAuth } from "./page/authentication/Auth";
import VatAndInstallation from "./page/Vat and Installation/VatAndInstallation";
import CustomerSetup from "./page/customer/CustomerSetup";
import AddCustomer from "./page/customer/Add_Customer";
import NewQuotation from "./page/quotation/NewQuotation";
import SideBar from "../src/components/Sidebar";
import WindowDoor from "./page/quotation/WindowDoor";
import MyCustomer from "./page/customer/MyCustomer";
import NotFoundPage from "./page/NotFoundPage";
import UserLogin from "./page/authentication/UserLogin";
import CreateNewUser from "./page/authentication/CreateNewUser";
import UserDashBoard from "./page/UserDashBoard/UserDashBoard";
import UserAdmin from "./page/authentication/UserAdmin";
import AdminLogin from "./page/authentication/AdminLogin";
import AdminDashboard from "./page/AdminDashboard/AdminDashboard";
import GlasSetup from "./page/GlassSetup/GlassSetup";
import Profile from "./page/ProfilePage/ProfilePage";
import MosquitoNetting from "./page/MosquitoNetting/MosquitoNetting";
import QuotationReport from "./page/quotation/QuotationReport";
import Email from "./page/Email/Email";
import Phone from "./page/Phone/Phone";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/vat-and-installtion" element={<VatAndInstallation />} /> */}
          {/* <Route path="/customer/customer-setup" element={<CustomerSetup />} /> */}
          {/* <Route path="/customer/add-customer" element={<AddCustomer />} /> */}
          {/* <Route path="/quotation/new-quotation" element={<NewQuotation />} /> */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/vat-and-installtion"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<VatAndInstallation />} />
              </div>
            }
          ></Route>
          <Route
            path="/admin-dashbord"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<AdminDashboard />} />
              </div>
            }
          ></Route>
          <Route
            path="/customer/add-customer"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<AddCustomer />} />
              </div>
            }
          ></Route>
          <Route
            path="/glass-setup"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<GlasSetup />} />
              </div>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<Profile />} />
              </div>
            }
          ></Route>
          <Route
            path="/mosquito-net"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<MosquitoNetting />} />
              </div>
            }
          ></Route>
          <Route
            path="/add-new-user"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<CreateNewUser />} />
              </div>
            }
          ></Route>
          <Route
            path="/user-dashboard"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<UserDashBoard />} />
              </div>
            }
          ></Route>

          <Route
            path="/all-customer"
            element={
              <div>
                <SideBar />
                <AdminProtectedRoute component={<CustomerSetup />} />
              </div>
            }
          ></Route>
          <Route
            path="/quotation"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<NewQuotation />} />
              </div>
            }
          ></Route>
          <Route
            path="/quotation/window-door"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<WindowDoor />} />
              </div>
            }
          ></Route>
          <Route
            path="/quotaition-report"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<QuotationReport />} />
              </div>
            }
          ></Route>
          <Route
            path="/my-customer"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<MyCustomer />} />
              </div>
            }
          ></Route>
          <Route
            path="/mail-data"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<Email />} />
              </div>
            }
          ></Route>
          <Route
            path="/phone-data"
            element={
              <div>
                <SideBar />
                <ProtectedRoute component={<Phone />} />
              </div>
            }
          ></Route>

          <Route
            path="/"
            element={
              <div>
                <UserAdmin />
              </div>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
const ProtectedRoute = ({ component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? component : <Navigate to="/" replace />;
};

const AdminProtectedRoute = ({ component }) => {
  const admin = localStorage.getItem("role");
  const { isLoggedIn } = useAuth();

  return isLoggedIn && admin === "admin" ? (
    component
  ) : (
    <Navigate to="/" replace />
  );
};
export default App;
