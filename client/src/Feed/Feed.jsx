import Post from './Post'
import './Post.css'
// import Image from '../Images/Luffy.jpg'

const Feed = () => {

   return ( 
    <div className="w-3/5 p-4 overflow-y-auto hide-scrollbar">
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Know What's going on?</h2>
            <div className="space-y-4">
                <Post />
                <Post imageUrl="/Luffy.jpg" />
            </div>
        </div>
    </div>


    )
}


export default Feed