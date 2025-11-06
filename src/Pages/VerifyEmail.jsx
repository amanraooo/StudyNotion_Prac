import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth);
    
  return (
    <div>
      {
        loading
        ?
        (
            <div>
                Loading...
            </div>
        ):(
            <div>
                <h1>Verify Email</h1>
                <p>A verification code has been sent to you.Enter the code below</p>

                <form>
                    <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props)=> <input {...props} />}
                    />

                    <button type='submit'>
                        Verify Email
                    </button>
                </form>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
