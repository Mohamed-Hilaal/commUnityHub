import UnityPost from './UnityPost'
import './UnityPost.css'
import { useEffect, useState } from 'react'
import HttpClient from '../../Http/HttpClient'
import CreateUnityPostModal from './CreateUnityPostModal';
// import Image from '../Images/Luffy.jpg'

const UnityFeed = ({unity_id, unity_name}) => {

    const [unityPosts, setUnityPosts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getUnityPosts = async () => {
        const response = await HttpClient.getData(`unityPost/get_unity_posts/${unity_id}`);

        if (!response.unity_posts) return 
        
        setUnityPosts(response.unity_posts)
    }

    const handleCreatePost = () => {
        setIsModalOpen(true)
    }

    useEffect(()=>{
        getUnityPosts()
    }, [])
    
   return ( 
    <div className="w-3/5 p-4 ml-10 overflow-y-auto hide-scrollbar">
        <div className="p-4">
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Know What's going on?</h2>
                <button onClick={handleCreatePost}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
                        </svg>
                </button>
            </div>
            <div className="space-y-4">
            {
                unityPosts.map(
                    (unityPost) => {
                        return (
                            <UnityPost unityPost={unityPost}/>
                        )
                    }
                )
            
            }
            </div>
        </div>
        {isModalOpen && <CreateUnityPostModal closeModal={closeModal} setUnityPosts={setUnityPosts} unity_id={unity_id}/> }
    </div>


    )
}


export default UnityFeed