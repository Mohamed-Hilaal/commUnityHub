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
    <div className="w-full md:w-2/6 h-screen dark:bg-black border-r border-gray-300 dark:border-gray-700 shadow-lg flex flex-col">
      
      <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <TbMessage2Plus className="w-6 h-6 text-gray-900 dark:text-white" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Inbox</h2>
        </div>
        <CiSearch className="w-6 h-6 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-all" />
      </div>

      <ul className="flex-1 overflow-y-auto divide-y divide-gray-300 dark:divide-gray-700">
        {interLinks.map((member) => (
          <li
            key={member.recipient_id}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all"
            onClick={() => handleChatNavigation(member.recipient_id, member.recipient_name)}
          >
            <Member member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;