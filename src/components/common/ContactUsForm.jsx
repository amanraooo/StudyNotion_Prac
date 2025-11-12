import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const { register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {

    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, { reset, isSubmitSuccessful })

    return (
        <div onSubmit={handleSubmit(submitContactForm)}>
            <div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder='Enter first name'
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter your name
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder='Enter last name'
                        {...register("lastname")}
                    />

                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter email'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your Email
                            </span>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        placeholder='Enter message'
                        cols="30"
                        rows="7"
                        {...register("message", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your Email
                            </span>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default ContactUsForm
