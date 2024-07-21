import HttpClient from '../Http/HttpClient'

const handleBtnClick = async () => {

    const res = await HttpClient.postData("auth/apiTesting")
    
    console.log(res, " : REs")

}
const Registration = () =>{
    return (
        <>
            Hey please register
        
            <button onClick={handleBtnClick}> Testing  </button>
        </>
    )
}

export default Registration