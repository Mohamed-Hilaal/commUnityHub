const Unity = () => {

    return (

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Neil image"/> */}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Thomas Lean
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                Join
                {/* $2367 */}
            </div>
        </div>
    )

}

export default Unity