import React, { useState } from "react";
import { Link } from "react-router";
import Button from "./Button";
import Input from "./Input";
import {
  useAddNewTaskMutation,
  useCreateProjectMutation,
  useGetProjectDetailesQuery,
 
} from "../../services/api";
import { IoClose } from "react-icons/io5";
import MultiMemberSelect from "./MultiMemberSelect";

const CreateTask = ({ modal, prjectId, members ,slug}) => {
   const { refetch} = useGetProjectDetailesQuery(slug);
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "mid",
    assignedTo: [],
    projectId: prjectId,
  });
  const [error, setError] = useState("");

  const [createTask] = useAddNewTaskMutation();
  const handelCreate = async (e) => {
    e.preventDefault();
    const res = await createTask(taskData);
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
          Create a new Task
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handelCreate} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Task Title</label>
            <Input
              type="text"
              placeholder="Task title here"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 `}
              onChange={(e) =>
                setTaskData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Task Decription
            </label>
            <Input
              type="text"
              placeholder="Task Decription here"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2`}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <select
              className="border w-full mt-2"
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
            >
              <option value="mid">Mid</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>

             <MultiMemberSelect
            members={members}
            selectedMembers={taskData.assignedTo}
            setSelectedMembers={(selectedIds) =>
              setTaskData((prev) => ({
                ...prev,
                assignedTo: selectedIds,
              }))
            }
          />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
