import React from "react";

const MultiMemberSelect = ({ members = [], selectedMembers = [], setSelectedMembers }) => {
  const handleSelect = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  return (
    <div className="border rounded-lg p-3 mt-2 max-h-48 overflow-y-auto">
      <p className="text-sm font-medium mb-2">Assign Members</p>

      <div className="space-y-2">
        {members.map((member) => (
          <label
            key={member._id}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          >
            <input
              type="checkbox"
              checked={selectedMembers.includes(member._id)}
              onChange={() => handleSelect(member._id)}
            />

            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white font-bold">
              {member?.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                member?.fullName?.charAt(0)
              )}
            </div>

            <span className="text-sm font-medium">{member.fullName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiMemberSelect;