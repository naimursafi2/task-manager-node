import React from "react";
import Navbar from "../components/layout/Navbar";
import { useGetProfileQuery, useGetProjectListQuery } from "../services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";

const Dashbord = () => {
  const { data, isLoading } = useGetProfileQuery();
  const { data: projectList, isLoading: projectLoading } =
    useGetProjectListQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to="/login" />;
  }
  console.log(projectList);

  return (
    <div>
      <Navbar data={data} />
    </div>
  );
};

export default Dashbord;
