
import HttpClient from "../Http/HttpClient"

const Unity = ({unityDetails}) => {

    const handleJoinUnity = async () => {
        const response = await HttpClient.postData('/unity/join', {unity_id: unityDetails.id})
        if (response.status === "success") {  
            console.log("Joined Unity")
        }
    }
    {console.log(unityDetails)}

    return (

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
                {unityDetails.communityName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {unityDetails.communityName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {unityDetails.category}
                </p>
            </div>
            <button onClick={handleJoinUnity} className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                Join
            </button>
        </div>
    )

}

export default Unity