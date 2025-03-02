
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/Sidebar"
import Communities from "../CommUnity/Communities"
import Inbox from "./Message/Inbox"
import ChatBox from "./Message/ChatBox"
import UnityFeed from './UnityFeed/UnityFeed'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"

const UnityBoard = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [showChatBox, setShowChatBox] = useState(false)
    const [memberId, setMemberId] = useState(null)
    const [memberName, setMemberName] = useState('')
    const {unity_id, unity_name} = location.state || {unity_id: null, unity_name: null}

    if (unity_id === null || unity_name === null) {
        navigate('/dashboard')
    }
    const handleChatNavigation =(id, name)=>{
        setMemberId(id)
        setMemberName(name)
        setShowChatBox(true)
    }

    return (
        <div className="flex h-screen pt-14">

            <Navbar/>   
            <SideBar/>

            <div className="flex flex-grow ml-64"> 
                <Inbox unity_id={unity_id} unity_name={unity_name} handleChatNavigation={handleChatNavigation}/>
                {showChatBox ? (
                    <ChatBox id={memberId} name={memberName}/>
                ) :
                    <UnityFeed unity_id={unity_id} unity_name={unity_name}/>
                }
            </div>

        </div>
    )
}

export default UnityBoard