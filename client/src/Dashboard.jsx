import SideBar from "./Sidebar"
import Navbar from "./Navbar"
import Communities from "./Communities"

import Feed from './Feed'

const Dashboard = () => {
    return (
        <>
            
        <div className="flex h-screen pt-14">

            <Navbar/>   

            <SideBar/>

            <div className="flex flex-grow ml-64"> 
                <Feed/>
                <Communities/>
            </div>

        </div>

            </>
    )
}

export default Dashboard


// {/* <>
// <div className="flex h-screen">
//     {/* Navbar */}
//     <nav className="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-200 dark:bg-black dark:border-gray-700">
//         {/* ... existing navbar content ... */}
//     </nav>

//     {/* Sidebar */}
//     <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-700" aria-label="Sidebar">
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
//             <ul className="space-y-2 font-medium">
//                 {/* ... existing sidebar content ... */}
//             </ul>
//         </div>
//     </aside>

//     {/* Main content area - wrapper */}
//     <div className="flex flex-grow ml-64 pt-14"> {/* ml-64 to account for sidebar width, pt-14 for navbar */}
//         {/* Feed area - 60% of remaining space */}
//         <div className="w-3/5 p-4 overflow-y-auto">
//             <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//                 <h2 className="text-2xl font-bold mb-4 dark:text-white">Feed</h2>
//                 <div className="space-y-4">
//                     {/* Example post */}
//                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//                         <h3 className="text-lg font-semibold mb-2 dark:text-white">Post Title</h3>
//                         <p className="text-gray-600 dark:text-gray-300">This is the content of the post. It can be a short description or the beginning of the post content.</p>
//                         <div className="mt-2">
//                             <span className="text-sm text-gray-500 dark:text-gray-400">Posted by User123 • 2 hours ago</span>
//                         </div>
//                     </div>
//                     {/* More posts would be added here */}
//                 </div>
//             </div>
//         </div>

//         {/* Chat app area - 40% of remaining space */}
//         <div className="w-2/5 p-4 bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Chat</h2>
//             {/* Chat app content would go here */}
//         </div>
//     </div>
// </div>

// </> */}