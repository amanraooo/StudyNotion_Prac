import React, { useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])
    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
    }
    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementsList])
    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementsList];

        updatedRequirementList.splice(index, 1);
        setRequirement(updatedRequirementList);
    }
    return (
        <div>
            <label><sup>*</sup></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => e.target.value}
                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                >
                    Add
                </button>
            </div>

            {
                requirementsList.length > 0 && (
                    <ul>
                        {
                            requirementsList.map((requirement, index) => {
                                <li key={index}>
                                    <span>{requirement}</span>
                                    <button type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                    >clear</button>
                                </li>
                            })
                        }
                    </ul>
                )
            }
            {errors[name] && (
                <span>
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementField
