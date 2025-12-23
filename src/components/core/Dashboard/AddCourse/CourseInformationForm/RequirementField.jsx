import React, { useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }
    return (
        <div>

        </div>
    )
}

export default RequirementField
