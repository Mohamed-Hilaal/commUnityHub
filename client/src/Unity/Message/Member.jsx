const Member = ({ member }) => {
  return (
    <div className="flex items-center space-x-3 w-full">
      {/* Avatar */}
      <div className="relative w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
        {member.recipient_name.charAt(0).toUpperCase()}

        {/* Online Status */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
            member.isOnline ? "bg-green-500" : "bg-green-500"
          }`}
        />
      </div>

      {/* Member Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{member.recipient_name}</p>
        <p className="text-xs text-gray-400 truncate w-40">{member.lastMessage || "No messages yet..."}</p>
      </div>

      {/* Unread Messages Indicator */}
      {member.unreadCount > 0 && (
        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
          {member.unreadCount}
        </span>
      )}
    </div>
  );
};

export default Member