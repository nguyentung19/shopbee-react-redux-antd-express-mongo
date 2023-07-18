import React from "react";
import Header from "../../Components/HomePage/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/HomePage/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actFetchMeWithToken } from "../../store/admin/auth/auth.action";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) dispatch(actFetchMeWithToken(token));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
