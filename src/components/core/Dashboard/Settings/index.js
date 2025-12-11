import React from 'react'

export default function Settings() {
    return (
        <>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
                Edit Your Profile
            </h1>

            {/* change profile pic */}
            <ChangeProfilePicture />

            {/* Profile */}
            <EditProfile />

            {/* Password */}
            <UpdatePassword />

            {/* delete account */}
            <DeleteAccount />

        </>
    )
}

