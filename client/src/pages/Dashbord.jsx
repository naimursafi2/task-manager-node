import React from "react";
import Navbar from "../components/layout/Navbar";
import { useGetProfileQuery, useGetProjectListQuery } from "../services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";
import TaskCard from "../components/ui/TaskCard";

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
      <div className="container mx-auto grid grid-cols-4 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {projectList?.project.map((project) => (
          <TaskCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashbord;
