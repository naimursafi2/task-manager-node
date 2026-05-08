import React, { use, useState } from "react";
import { useGetProjectDetailesQuery } from "../services/api";
import Button from "../components/ui/Button";
import UserAvatarGroup from "../components/ui/UserAvatarGroup";
import PriorityBadge from "../components/ui/PriorityBadge";
import CreateProject from "../components/ui/CreateProject";
import CreateTask from "../components/ui/CreateTask";
import { useParams } from "react-router";
import Loader from "../components/ui/Loader";

const ProjectDetiles = () => {
const {slug} = useParams();
console.log(slug)

  const [modal, setModal] = useState(false);
  const { data, isLoading } = useGetProjectDetailesQuery(slug);
 if(isLoading) return <Loader/>

  return (
    <div className="py-33">
      <div className="max-w-4xl m-auto">
        <div className="flex justify-between border-b pb-2">
          <h1 className="text-2xl">Task Manager</h1>
          <Button>Add Member</Button>
        </div>

        <div className="flex justify-between items-start mt-2 border-b pb-2">
          <div>
            <h2 className="text-2xl pt-2">{data?.title}</h2>
            <p>{data?.description}</p>
          </div>

          <div className="min-w-42.5">
            <div className="flex items-center gap-2 mb-3">
              <p className="mb-1">Author:</p>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold text-white">
                {data?.author?.avatar ? (
                  <img
                    src={data.author.avatar}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  data?.author?.fullName?.charAt(0)
                )}
              </div>

              <h2 className="text-sm font-bold text-gray-800">
                {data?.author?.fullName}
              </h2>
            </div>

            <p className="mb-1">Members:</p>

            {data?.members?.length > 0 && (
              <UserAvatarGroup members={data.members} />
            )}
          </div>
        </div>

        <div className="py-20 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl">Task List</h2>
            <Button onClick={()=>setModal(true)}>Add Task</Button>
          </div>
          {data?.tasks?.map((item) => (
            <div
              key={item._id}
              className="bg-slate-200 p-5 rounded-2xl flex justify-between"
            >
              <div>
                <h1 className="text-2xl">{item?.title}</h1>
                <p>{item?.description}</p>
                Assigned to:
                <UserAvatarGroup members={item?.assignedTo} />
              </div>
              <div className="space-y-4">
                Priority: <PriorityBadge priority={item.priority} />
                <p>{item?.isComplete ? "completed" : "incompleted"}</p>
                <Button>Assign Member</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
       {modal && <CreateTask modal={(mode) => setModal(mode)} prjectId={data._id} members={data?.members}/>}
    </div>
  );
};

export default ProjectDetiles;
