import React, {useState} from 'react'
import Unity from "./Unity"
import CreateUnityModal from './CreateUnityModal';

const Communities = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCommunity = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <div className="w-2/5 p-4 bg-white border-l border-gray-200 dark:bg-black dark:border-gray-700 ">
            
            <div className="community-header-container flex justify-between items-center mb-4">

                <div className="community-header">
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <h2 className="text-xl font-bold dark:text-white flex-1 ms-3 whitespace-nowrap">CommUnities</h2> 
                        {/* <span className="flex-1 ms-3 whitespace-nowrap">Users</span> */}
                    </a>            
                </div>

                <button className="create-community" onClick={handleCreateCommunity}>
                    
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
            
            <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                    <Unity/>
                </li>
                <li className="py-3 sm:py-4">
                    <Unity/>
                </li>
                <li className="py-3 sm:py-4">
                    <Unity/>
                </li>
            </ul>


            {isModalOpen && <CreateUnityModal closeModal={closeModal}/> }

        </div>
    )
}

export default Communities


