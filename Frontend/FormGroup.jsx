import React from 'react'

const FormGroup = ({ label, placeholder, value, onChange, type, name }) => {
    return (

        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value = {value}
                onChange={onChange}
                type={type}
                id={name}
                name={name}
                required
                placeholder={placeholder} />
        </div>

    )
}

export default FormGroup
