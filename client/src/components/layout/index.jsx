import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

import { useGetProfileQuery } from "../../services/api";

const Layout = () => {
  const { data, isLoading } = useGetProfileQuery();
  return (
    <>
      <Navbar data={data} />
      <Outlet />
    </>
  );
};

export default Layout;
