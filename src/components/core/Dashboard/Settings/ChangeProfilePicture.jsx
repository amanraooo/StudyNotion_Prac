import React, { useRef, useState } from 'react'
import IconBtn from './../../../common/IconBtn';
import { FiUpload } from 'react-icons/fi';

const ChangeProfilePicture = () => {
    const fileInputRef = useRef(null);

   const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const handleFileChange =(e)=>{
        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            setPreviewSource(file);
        }
    }

    const  handleClick =()=>{
        fileInputRef.current.click();
    }

    const handleFileUpload =()=>{
        try{
            setLoading(true);
            const formdata =new FormData();
            formdata.append("displayPicture", imageFile)
            dispatch(updateDisplayPicture(tokens,formdata))
            setLoading(false);
        }catch(error){
            console.log("Error Message", error.message)
        }
    }
    
    const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  return (
    <>
     <div>
        <div>
            <img src={previewSource || user?.image}   alt={`profile-${user?.firstName}`} />
            <div>
                <p>Change Profile Picture</p>
                <div>
                    <input type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept='image/png, image/gif, image/jpeg'
                    />
                    <button
                    onClick={handleClick}
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
Select
                    </button>

                    <IconBtn
                    text={loading ? "Uploading..." : "Upload"}
                    onclick={handleFileUpload}>
                       {
                        !loading && (
                            <FiUpload className="text-lg text-richblack-900"/>
                        )
                       } 

                    </IconBtn>
                </div>
            </div>
        </div>

        </div> 
    </>
  )
}

export default ChangeProfilePicture
