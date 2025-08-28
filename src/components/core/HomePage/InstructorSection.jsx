import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"


const InstructorSection = () => {
  return (
    <div className='mt-20'>
      <div className="flex flex-row gap-20 items-center">
        <div className='w-[50%]'>
    <img src={Instructor} alt="instructor"
    className='shadow-white' />
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
