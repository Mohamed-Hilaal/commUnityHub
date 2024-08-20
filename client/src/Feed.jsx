import Post from './Post'

const Feed = () => {

   return ( 
        <div className="w-3/5 p-4 overflow-y-auto">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Know What's going on ?</h2>
                <div className="space-y-4">
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>

    )
}


export default Feed