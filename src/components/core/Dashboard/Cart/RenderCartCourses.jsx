import React from 'react'

const RenderCartCourses = () => {
    return (
        <div>
            {
                cart.map((course, index) => {
                    <div>
                        <div>
                            <img src={course?.thumbnail} />

                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    <span>4.8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default RenderCartCourses
