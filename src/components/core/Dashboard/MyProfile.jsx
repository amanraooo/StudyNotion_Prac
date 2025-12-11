import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from './../../common/IconBtn';

const MyProfile = () => {

  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <div>
      <h1>
        My Profile
      </h1>

      {/* section 1 */}
      <div>
        <div>
          <img src={user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover'
          />

          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        />

        {/* sectionw 2 */}
        <div>
          <div>
            <p></p>
            <IconBtn
              text="edit"
              onclick={() => { navigate("dashboard/settings") }}
            />
          </div>
          <p>{user?.additionalDetails?.about ?? "Write something about Yourself"}</p>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
