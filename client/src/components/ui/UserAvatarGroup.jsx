export default function UserAvatarGroup({ members }) {
  // if (!users || users.length === 0) {
  //   return <p className="text-sm text-gray-400">No assignee</p>;
  // }

  return (
    <div className="flex items-center border-t border-t-gray-300 pt-2">
      {members.map((user, index) => (
        <div
          key={user._id}
          title={user.name}
          className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-bold text-white first:ml-0"
        >
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="members"
              className="h-full w-full object-cover"
            />
          ) : (
            user?.fullName?.charAt(0)
          )}
        </div>
      ))}
    </div>
  );
}
