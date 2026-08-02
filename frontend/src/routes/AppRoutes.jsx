import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Admin
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import UserDetails from "../pages/admin/UserDetails";
import CreateStore from "../pages/admin/CreateStore";
import StoreDetails from "../pages/admin/StoreDetails";

// Owner
import OwnerDashboard from "../pages/owner/Dashboard";
import Store from "../pages/owner/Store";
import Ratings from "../pages/owner/Ratings";

// User
import UserDashboard from "../pages/user/Dashboard";
import UserStores from "../pages/user/Stores";

import AdminLayout from "../layouts/AdminLayout";

import OwnerLayout from "../layouts/OwnerLayout";

import UpdateStore from "../pages/owner/UpdateStore";

import UserLayout from "../layouts/UserLayout";
import UpdatePassword from "../pages/user/UpdatePassword";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

				<Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
					<Route element={<AdminLayout />}>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/users" element={<Users />} />
						<Route path="/admin/users/:id" element={<UserDetails />} />
						<Route path="/admin/stores" element={<Stores />} />
            <Route path="/admin/stores/:id" element={<StoreDetails />} />
            <Route path="/admin/create-store" element={<CreateStore />} />
					</Route>
				</Route>

        <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
          <Route element={<OwnerLayout />}>
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/store" element={<Store />} />
            <Route path="/owner/ratings" element={<Ratings />} />
            <Route path="/owner/store/edit" element={<UpdateStore />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/stores" element={<UserStores />} />
            <Route path="/user/password" element={<UpdatePassword />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;