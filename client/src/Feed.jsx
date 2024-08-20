const Feed = () => {

   return ( 
<div class="w-3/5 p-4 overflow-y-auto">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Feed</h2>
        <div class="space-y-4">

            {/* <!-- Post --> */}
            <div class="bg-white dark:bg-black p-4 rounded-lg shadow">
                <div class="flex items-center mb-4">
                    {/* <!-- User Image --> */}
                     <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                    {/* <!-- User Name and Time --> */}
                    <div class="ml-3">
                        <h3 class="text-lg font-semibold dark:text-white">User Name</h3>
                        <span class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                    </div>
                </div>
                {/* <!-- Post Content --> */}
                <p class="text-gray-600 dark:text-gray-300">This is the content of the post. It can be a short description or the beginning of the post content.</p>
                {/* <!-- Post Image (Optional) --> */}
                {/* <div class="mt-4">
                    <img class="rounded-lg" src="post-image-url" alt="Post Image"/>
                </div> */}
                {/* <!-- Interaction Buttons --> */}
                <div class="flex justify-between items-center mt-4">
                    <button class="text-blue-500 hover:underline">Like</button>
                    <button class="text-blue-500 hover:underline">Comment</button>
                    <button class="text-blue-500 hover:underline">Share</button>
                </div>
            </div>

        
            <div class="bg-white dark:bg-black p-4 rounded-lg shadow">
                <div class="flex items-center mb-4">
                     <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                    <div class="ml-3">
                        <h3 class="text-lg font-semibold dark:text-white">User Name</h3>
                        <span class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300">This is the content of the post. It can be a short description or the beginning of the post content.</p>
                {/* <div class="mt-4">
                    <img class="rounded-lg" src="post-image-url" alt="Post Image"/>
                </div> */}
                <div class="flex justify-between items-center mt-4">
                    <button class="text-blue-500 hover:underline">Like</button>
                    <button class="text-blue-500 hover:underline">Comment</button>
                    <button class="text-blue-500 hover:underline">Share</button>
                </div>
            </div>

        </div>
    </div>
</div>

    )
}


export default Feed