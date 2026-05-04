import PriorityBadge from "./PriorityBadge";
import UserAvatarGroup from "./UserAvatarGroup";

export default function TaskCard({ task }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            {task.description}
          </p>
        </div>

        <PriorityBadge priority={task.priority} />
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
          Assigned To
        </p>
        <UserAvatarGroup users={task.assignedTo} />
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            task.isComplete
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {task.isComplete ? "Completed" : "Pending"}
        </span>

        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
          Details
        </button>
      </div>
    </div>
  );
}
