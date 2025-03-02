const Member = ({ member }) => {
    return (
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
          {member.username.charAt(0).toUpperCase()}
        </div>
  
        {/* Member Details */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{member.username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Last message preview...</p>
        </div>
  
        {/* Reply Button */}
        <button className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition-all">
          Reply
        </button>
      </div>
    );
  };

export default Member