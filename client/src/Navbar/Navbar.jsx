import { TiGroupOutline } from 'react-icons/ti';
import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from "../UserContext"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { currentUserDetails } = useContext(UserContext);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
                setProfileDropdown(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const [profileDropdown, setProfileDropdown] = useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    const navigateToUnityBoard = () => {   
        navigate("/unityBoard", {state: {unity_id: currentUserDetails.current_unity_id, unity_name: currentUserDetails.current_unity_name}})
    }

    return (

        <nav className="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-200 dark:bg-black dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <a className="flex ms-2 md:me-24">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CommUnityHub</span>
                </a>
            </div>
            <div className="flex items-center">
                <div className="flex items-center ms-3">
                    <div className="flex justify-between items-center">
                            <div className="text-base list-none divide-y divide-gray-100 rounded" id="dropdown-user">
                            <button id="unityDropdown" onClick={toggleDropdown} className="relative flex mx-2 text-sm rounded-full dark:focus:ring-gray-600" type="button">
                                <span className="sr-only group-hover:block absolute top-full mt-1 text-white bg-gray-800 rounded-md p-1">Open user menu</span>
                                <TiGroupOutline className="w-8 h-8 dark:text-white" />
                            </button>

                            {dropdownOpen && (
                                <div ref={dropdownRef} id="unityDropdown" className="absolute right-2 mt-2  bg-white divide-y divide-gray-100 rounded-lg w-70 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3 text-sm dark:text-blue-200">

                                    {currentUserDetails.current_user_id && currentUserDetails.current_unity_id && currentUserDetails.current_unity_name != "" ? (
                                        <>
                                            <div>You're currently representing </div>
                                            <div className="font-large truncate">{currentUserDetails.current_unity_name}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>You're not currently representing any Unity</div>
                                            <div className="font-large truncate"></div>
                                        </>
                                    )}
                                    </div>

                                    <ul className="py-1" role="none">
                                        <li onClick={navigateToUnityBoard}>
                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                    </ul>
                                                
                                    <div className="">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:text-green-200 dark:hover:text-white">Switch Unity</a>
                                    </div>
                                </div>
                            )}

                            </div>
                            <div className="text-base list-none divide-y divide-gray-100 rounded" id="dropdown-user">

                                <button type="button" onClick={toggleProfileDropdown} className="relative flex mx-2 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only group-hover:block absolute top-full mt-1 text-white bg-gray-800 rounded-md p-1">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                                </button>
                                
                                    { profileDropdown && (

                                        <div ref={dropdownRef} className="absolute right-2 mt-2  bg-white divide-y divide-gray-100 rounded-lg w-70 dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                            <div className="px-4 py-3" role="none">
                                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                    {currentUserDetails.current_user_name}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                    {currentUserDetails.current_user_email}
                                                </p>
                                            </div>
                                                <ul className="py-1" role="none">
                                                    <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                                    </li>
                                                    <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                                    </li>
                                                    <li>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                                    </li>
                                                </ul>
                                            <div className="">
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:text-red-400 dark:hover:text-white">Sign Out</a>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                                
                            </div>  
                        </div>  
                </div>
            </div>
        </div>
        </nav>
    )

}

export default Navbar