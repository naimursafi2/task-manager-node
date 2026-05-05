import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useGetProfileQuery, useGetProjectListQuery } from "../services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";
import TaskCard from "../components/ui/TaskCard";
import Button from "../components/ui/Button";
import CreateProject from "./CreateProject";

const Dashbord = () => {
  const { data, isLoading } = useGetProfileQuery();
  const { data: projectList, isLoading: projectLoading } =
    useGetProjectListQuery();
  const [modal, setModal] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to="/login" />;
  }

  console.log(projectList);

  return (
    <div>
      <Button
        onClick={() => setModal(true)}
        className="fixed bottom-10 right-5 cursor-pointer"
        size="lg"
      >
        + Create Task
      </Button>
      <Navbar data={data} />
      <div className="container mx-auto mt-2 gap-7 grid p-5 md:grid-cols-2 lg:grid-cols-4">
        {projectList?.project?.map((project) => (
          <TaskCard key={project._id} project={project} />
        ))}
      </div>
      {modal && <CreateProject modal={(mode) => setModal(mode)} />}
    </div>
  );
};

export default Dashbord;
