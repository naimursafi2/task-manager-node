import React from "react";
import { useGetProjectDetailesQuery } from "../services/api";
import { Link } from "react-router";

const ProjectDetiles = () => {
  const { data } = useGetProjectDetailesQuery("website-uk-client");

  return (
    <div className="py-40">
      <div className="container">
        <h1 className="text-2xl border-b pb-2">Task Manager</h1>

        <div className="flex justify-between items-center mt-2 border-b">
          <div>
            <h2 className="text-2xl pt-2">{data?.title}</h2>
            <p>{data?.description}</p>
          </div>

          <div className="flex items-center gap-2">
            Author:
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold text-white">
              {data?.author?.avatar ? (
                <img
                  src={data?.author?.avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                data?.author?.fullName?.charAt(0)
              )}
            </div>

            <h2 className="text-sm font-semibold text-gray-800">
              {data?.author?.fullName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetiles;
