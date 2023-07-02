import React from 'react';
import PropTypes from "prop-types";

const RadioField = ({options, name, onChange, value, label}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    return ( 
        <div className='mb-4'>
            <label className='form-label'>
                {label}
            </label>
            <br></br>
            {options.map(option=>(
                <div key={option.name+"_"+option.value} class="form-check form-check-inline">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name={name}
                        id={option.name+"_"+option.value} 
                        value={option.value}
                        checked={option.value === value}
                        onChange={handleChange}    
                        />
                    <label 
                        className="form-check-label" 
                        htmlFor={option.name+"_"+option.value}
                        >{option.name}
                    </label>
                </div>
            ))}
        </div>
     );
}

RadioField.propTypes={
    options:PropTypes.array,
    name:PropTypes.string,
    onChange:PropTypes.func,
    value:PropTypes.string,
    label:PropTypes.string
}

export default RadioField;