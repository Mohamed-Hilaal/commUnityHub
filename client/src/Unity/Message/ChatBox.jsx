import React, { useState, useEffect, useRef } from "react"
import { LiaTelegramPlane } from "react-icons/lia"
import { sendMessage, listenForMessages } from "../../Firebase/firebaseFunctions"
import { format } from 'date-fns'

const ChatBox = ({ current_user_id, recipient_id, recipient_name, chatId }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    listenForMessages(chatId, setMessages)
    console.log(messages)
  }, [])

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Now'
    const date = timestamp.toDate()
    return format(date, 'PPpp')
  }

  const send = () => {
    if (!input.trim()) return
    console.log(current_user_id, recipient_id, recipient_name)
    if (!sendMessage(chatId, current_user_id, recipient_id, input)) return
    setMessages([...messages, { message: input, senderId: current_user_id, recieverId: recipient_id }])
    setInput("")
  }

  return (
<div className="w-full p-5 bg-white border-l border-gray-200 dark:bg-black dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-300 dark:border-gray-700">
        <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
          {recipient_name.charAt(0).toUpperCase()}
        </div>
        <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">{recipient_name}</h2>
      </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 dark:bg-black">
        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex gap-2.5 items-start ${
              (msg.senderId === current_user_id) ? "justify-end" : "justify-start"
            }`}
          >
          {/* Show Profile Picture Only for Others */}
          {(msg.senderId === recipient_id || msg.recieverId === current_user_id )&& (
              <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
              {recipient_name.charAt(0).toUpperCase()}
            </div>

          )}

          {/* Message Bubble Container */}
          <div
            className={`flex flex-col gap-1 max-w-[70%] ${
              msg.senderId === current_user_id ? "items-end" : "items-start"
            }`}
          >
            {/* Sender Name & Timestamp */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-md font-semibold text-gray-900 dark:text-white">
                {msg.senderId === current_user_id ? "You" : recipient_name}
              </span>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                {(formatTimestamp(msg.timestamp))}
              </span>
            </div>

            <div
              className={`flex flex-col leading-1.5 p-3 shadow-md ${
                (msg.senderId)
                  ? "bg-blue-500 text-white rounded-s-xl rounded-se-xl animate-fade-in"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-e-xl rounded-es-xl animate-slide-in"
              }`}
            >
              <p className="text-sm font-normal">{msg.message}</p>
            </div>

            {msg.senderId === current_user_id && (
              <span className="text-xs text-gray-500 dark:text-gray-400">Delivered</span>
            )}
          </div>
        </div>
        ))}

    {/* Keeps the last message in view */}
        <div ref={messagesEndRef} />
        </div>

      {/* Input Field */}
      <div className="border-t border-gray-300 dark:border-gray-700 p-3 flex items-center bg-white dark:bg-black">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          className="ml-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-all duration-200"
        > <LiaTelegramPlane size={18} />
        </button>
      </div>
    </div>
  )
}

export default ChatBox
