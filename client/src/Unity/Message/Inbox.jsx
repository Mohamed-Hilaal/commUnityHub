import { TbMessage2Plus } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import Member from "./Member";
import HttpClient from "../../Http/HttpClient";

const Inbox = ({ unity_id, unity_name, handleChatNavigation }) => {
  const [interLinks, setInterLinks] = useState([]);

  useEffect(() => {
    const getInterLinks = async () => {
      const response = await HttpClient.getData(`unity_chat/get`);
      setInterLinks(response.recipients);
    }
    getInterLinks()
  }, []);

  return (
    <div className="w-full md:w-2/6 bg-black border-r shadow-lg flex flex-col">
      
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <TbMessage2Plus className="w-6 h-6 text-white" />
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>
        <CiSearch className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-200 transition-all" />
      </div>

      {/* Member List */}
      <ul className="flex-1 overflow-y-auto">
        {interLinks.map((member) => (
          <li
            key={member.recipient_id}
            className="p-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-800 transition-all rounded-md mx-2"
            onClick={() => handleChatNavigation(member.recipient_id, member.recipient_name, member.chat_id)}
          >
            <Member member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;