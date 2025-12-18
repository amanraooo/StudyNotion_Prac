import React from 'react'
import IconBtn from './../../../common/IconBtn';
import { useSelector } from 'react-redux';

const RenderTotalAmount = () => {

  const { total, cart } = useSelector((state) => state.cart)

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course.id);
    console.log("bought these courses", courses);
  }
  return (
    <div>
      <p>Total</p>
      <p>Rs {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount
