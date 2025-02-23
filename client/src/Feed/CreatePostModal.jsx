import CreatePostForm from "./CreatePostForm"
import { useState } from "react";
import HttpClient from '../Http/HttpClient'

const CreatePostModal = ({closeModal, setUnityPosts}) => {


    const [content, setContent] = useState("")

    const handleContentChange = (e) => {
        
        let val = e.target.value
        if( val.length <= 350 ){
            setContent(e.target.value)
        }

    }

    const handlPostCreation = async (e) => {
        e.preventDefault()

        if (content === "") return

        const res = await HttpClient.postData('post/create_post', 
          {content: content, title: ""}
        )
        
        if (res.status !== "success") return
        
        setUnityPosts((prev) => ( 
            [...prev, {content: content, posted_by: "You"}]
         ))
        console.log("setted")

        closeModal()

    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-top justify-center min-h-screen p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[30vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    What's on your mind?
                </h4>
                <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                <CreatePostForm handlPostCreation = {handlPostCreation} content={content} handleContentChange={handleContentChange}/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreatePostModal