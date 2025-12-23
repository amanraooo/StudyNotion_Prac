import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getvalue,
    formState: { error },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories();
  }, [])

  const onSubmit = async (data) => {

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=""
    >
      <div>
        <label htmlFor=""> Course Title
          <sup>*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder='Enter course title'
          {...register("courseTitle", { required: true })}
          className="w-full"
        />
        {
          error.courseTitle && (
            <span>Course Title is Required**</span>
          )
        }
      </div>
      <div>
        <label htmlFor=""> Course Short Description
          <sup>*</sup>
        </label>
        <input
          type="text"
          id="courseShortDesc"
          placeholder='Enter Description'
          {...register("courseShortDesc", { required: true })}
          className="w-full"
        />
        {
          error.courseShortDesc && (
            <span>Course Description is Required**</span>
          )
        }
      </div>

      <div>
        <label htmlFor=""> Course Price
          <sup>*</sup>
        </label>
        <input

          id="coursePrice"
          placeholder='Enter Price'
          {...register("coursePrice", { required: true, valuAsNumber: true })}
          className="w-full"
        />
        <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
        {
          error.coursePrice && (
            <span>Course Price is Required**</span>
          )
        }

      </div>

      <div>
        <label htmlFor="">Course Category <sup>*</sup></label>
        <select
          id="CourseCategory"
          name="CourseCategory"
          {...register("CourseCategory", { required: true })}

        >
          <option value="" disabled>Choose a Category</option>
          {
            !loading && courseCategories.map((category, index) => (
              <option
                key={index}
                value={category?.value}>
                {category?.name}
              </option>
            ))
          }
        </select>
      </div>
    </form>
  )
}

export default CourseInformationForm;
