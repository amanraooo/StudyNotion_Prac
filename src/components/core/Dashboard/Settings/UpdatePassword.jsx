import React, { useState } from 'react'
import { AiOutlineEyeInvisible } from 'react-icons/ai';

const UpdatePassword = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitPasswordForm = async (data) => {
        try {
            await changePassword(token, data)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div>
                    <h2>Password</h2>
                    <div>
                        <div>
                            <label
                                htmlFor="oldPassword">
                                Current Password
                            </label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder='Enter Current Password'
                                {...register("oldPassword", { required: true })}
                            />
                            <span
                                onClick={() => setShowOldPassword((prev) => !prev)}>
                                {showOldPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
                            </span>
                            errors.oldPassword &&(
                            <span>
                                Please enter your Current Password.
                            </span>
                            )
                        </div>

                        <div>
                            <label htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name='newPassword'
                                id='newPassword'
                                placeholder='Enter new password'
                                {...register("newPassword", { required: true })} />
                            <span
                                onClick={() => { setShowNewPassword((prev) => !prev) }}
                            >
                                {
                                    showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>
                            {errors.newPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your New Password.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Update" />
                </div>
            </form>
        </>
    )
}

export default UpdatePassword
