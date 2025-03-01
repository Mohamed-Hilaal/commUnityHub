
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/Sidebar"
import Communities from "../CommUnity/Communities"
import UnityFeed from './UnityFeed/UnityFeed'
import { useLocation, useNavigate } from "react-router-dom"

const UnityBoard = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {unity_id, unity_name} = location.state || {unity_id: null, unity_name: null}

    if (unity_id === null || unity_name === null) {
        navigate('/dashboard')
    }

    return (
        <div className="flex h-screen pt-14">

            <Navbar/>   
            <SideBar/>

            <div className="flex flex-grow ml-64"> 
                <Communities/>
                <UnityFeed unity_id={unity_id} unity_name={unity_name}/>
            </div>

        </div>
    )
}

export default UnityBoard