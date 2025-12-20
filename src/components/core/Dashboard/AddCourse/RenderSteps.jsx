import React from 'react'

const RenderSteps = () => {

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    }
  ]
  return (
    <>
      <div>
        {
          steps.map((item) => {
            <>
              <div className={`${step === item.id
                ? "bg-yellow-900 border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-50"
                }`}>

              </div>
            </>
          })
        }
      </div>
    </>

  )
}

export default RenderSteps
