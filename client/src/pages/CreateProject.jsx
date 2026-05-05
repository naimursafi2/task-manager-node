import React, { useState } from "react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  useCreateProjectMutation,
  useGetProjectListQuery,
} from "../services/api";
import { IoClose } from "react-icons/io5";

const CreateProject = ({ modal }) => {
  const { refetch } = useGetProjectListQuery();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const [createProject] = useCreateProjectMutation();
  const handelCreate = async (e) => {
    e.preventDefault();
    const res = await createProject(projectData);
    if (res.error) {
      setError("Something went wrong");
      return;
    }
    refetch();
    modal(false);
  };
  return (
    <div className="h-screen w-full bg-gray-700/40 fixed top-0 left-0 flex items-center justify-center">
      <div className="relative flex flex-col max-w-md mx-auto  p-6 shadow-lg rounded-2xl bg-white w-full">
        <button
          onClick={() => modal(false)}
          className=" absolute top-4  right-4 text-gray-500 hover:text-red-500 text-3xl cursor-pointer"
        >
          <IoClose />
        </button>
        <h2 className="text-2xl font-semibold mb-5 mt-4 text-center">
          Create a new Project
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handelCreate} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Project Title
            </label>
            <Input
        
              type="text"
              placeholder="project title here"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 `}
              onChange={(e) =>
                setProjectData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Project Decription
            </label>
            <Input
              type="text"
              placeholder="project Decription here"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2`}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
