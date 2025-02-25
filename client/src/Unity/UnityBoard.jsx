
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/Sidebar"
import Communities from "../CommUnity/Communities"
import UnityFeed from './UnityFeed/UnityFeed'

const UnityBoard = () => {
    return (
        <div className="flex h-screen pt-14">

            <Navbar/>   
            <SideBar/>

            <div className="flex flex-grow ml-64"> 
                <Communities/>
                <UnityFeed/>
            </div>

        </div>
    )
}

export default UnityBoard