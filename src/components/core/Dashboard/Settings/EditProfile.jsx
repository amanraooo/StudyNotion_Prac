import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from './../../../common/IconBtn';

const genders = ["Male", "Female", "Prefer not to say", "Other"]

const EditProfile = () => {
    const {register, 
        handleSubmit, 
        formState: { errors }} 
        = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const submitProfileForm = async (data)=>{
    try{
        dispatch(updateProfile(token,data))
    }catch(error){
        console.log("error message- ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div>
            <h2>Profile Information</h2>
                <div>
                    <div>
                        <label 
                        htmlFor="firstName"
                        >First Name</label>
                        <input 
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        className='form-style'
                        {...register("firstName", {required:true})}
                        defaultValue={user?.firstName}
                        />
                        {errors.firstName &&(
                            <span>
                                Please enter your first name
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        className='form-style'
                        {...register("lastName", {required: true})}
                        defaultValue={user?.lastName}
                        /> 
                        {
                            errors.lastName &&(
                                <span>Please enter your last name</span>
                            )
                        }
                    </div>

                </div>

                <div>
                    <div>
                        <label htmlFor="dateOfBirth" > Date of Birth</label>
                        <input 
                        type="date"
                        name='dateOfBirth'
                        id='dateOfBirth'
                        {...register("dateOfBirth",
                            {
                                required:{
                                    value: true,
                                    message: "Please enter your Date of Birth"
                                },
                                max:{
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future.",
                                },
                            }
                        )}
                        defaultValue={user?.additionalDetails?.dateofBirth}
                        />
                        {
                            errors.dateofBirth && (
                                <span>
                                    {errors.dateofBirth?.message}
                                </span>
                            )
                        }
                    </div>

                        <div>
                            <label 
                            htmlFor="gender">
                                Gender
                            </label>
                            <select 
                            type="text"
                            name="gender"
                             id="gender"
                             {...register("gender", {required:true})}
                             defaultValue={user?.additionalDetails?.gender}
                             >
                                {
                                    genders.map((ele,i)=>{
                                        return(
                                            <option key={id}
                                            value="ele"
                                            
                                            >
                                                {ele}
                                            </option>
                                        )
                                    })
                                }
                             </select>
                             {errors.gender &&(
                                 <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
                             )}
                        </div>
                </div>

        </div>

        <div>
            <button
            onClick={()=>{
                navigate("/dashboard/my-profile")
            }}
            >
                Cancel
            </button>

            <IconBtn tyoe="submit text="save/>
        </div>
      </form>
    </>
  )
}

export default EditProfile
