import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';

const EnrolledCourses = () => {

    const [enrolledCourses, setEnrolledCourses] = useState();
    const {token} = useSelector((state)=> state.auth)

    const getEnrolledCourses = async()=>{
        try{
            const response = await getUserEnrolledCourses(token)

            setEnrolledCourses(response)
        }catch(error){
            console.log("unable to fetch enrolled courses")
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[])
    
  return (
    <div>
      
    </div>
  )
}

export default EnrolledCourses
