
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/Sidebar"
import Inbox from "./Message/Inbox"
import ChatBox from "./Message/ChatBox"
import UnityFeed from './UnityFeed/UnityFeed'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"
import HttpClient from "../Http/HttpClient"

const UnityBoard = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [showChatBox, setShowChatBox] = useState(false)
    const [memberId, setMemberId] = useState(null)
    const [memberName, setMemberName] = useState('')
    const [chatId, setChatId] = useState('')
    const {unity_id, unity_name, user_id} = location.state || {unity_id: null, unity_name: null, user_id: null}

    if (unity_id === null || unity_name === null || user_id === null) {
        navigate('/dashboard')
    }
    const handleChatNavigation = async(id, name, chat_id)=>{
        setMemberId(id)
        setMemberName(name)
        setShowChatBox(true)
        setChatId(chat_id)

        // const res = await HttpClient.postData('unity_chat/create')
        // console.log(res)
    }

    return (
        <div className="flex h-screen pt-14">

            <Navbar/> 
            <SideBar/>

            <div className="flex flex-grow ml-64"> 
                <Inbox unity_id={unity_id} unity_name={unity_name} handleChatNavigation={handleChatNavigation}/>
                {showChatBox ? (
                    <ChatBox recipient_id={memberId} recipient_name={memberName} chatId={chatId} current_user_id={user_id}/>
                ) :
                    <UnityFeed unity_id={unity_id} unity_name={unity_name}/>
                }
            </div>

        </div>
    )
}

export default UnityBoard