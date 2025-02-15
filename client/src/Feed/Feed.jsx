import Post from './Post'
import './Post.css'
import { useEffect, useState } from 'react'
import HttpClient from '../Http/HttpClient'
// import Image from '../Images/Luffy.jpg'

const Feed = () => {

    const [unityPosts, setUnityPosts] = useState([])

    const getUnityPosts = async () => {
        const response = await HttpClient.getData('post/get_unity_posts')
        console.log(response)
        setUnityPosts(response.unity_posts)
    }

    useEffect(()=>{
        getUnityPosts()
    }, [])
    
   return ( 
    <div className="w-3/5 p-4 overflow-y-auto hide-scrollbar">
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Know What's going on?</h2>
            <div className="space-y-4">
            {
                unityPosts.map(
                    (unityPost) => {
                        return (
                            <Post unityPost={unityPost}/>
                        )
                    }
                )
            
            }
            </div>
        </div>
    </div>


    )
}


export default Feed