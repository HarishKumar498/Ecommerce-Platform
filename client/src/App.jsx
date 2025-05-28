import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminOrders from "./pages/admin-view/Orders";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminFeatures from "./pages/admin-view/Features";
import ShoopingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/Not-Found";
import Home from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import Account from "./pages/shopping-view/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnAuthPage from "./pages/unauthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

const App = () => {
  // const isAuthenticated = false;
  // const user = null;
  const {isAuthenticated,user, isLoading} = useSelector((state)=>state.auth)

  const dispatch = useDispatch();
  useEffect(()=>{dispatch(checkAuth())},[dispatch])
  if(isLoading) return <div>Loading...</div>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>Header Component</h1> */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="orders" element={<AdminOrders />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoopingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
