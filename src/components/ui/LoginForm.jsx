import React, {useEffect, useState} from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/CheckBoxField';

const LoginForm = () => {
    const [data, setData] = useState(
        {
            email:"",
            password:"", 
            stayOn:false
        });

    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
    setData((prevState) => ({
        ...prevState, 
        [target.name]: target.value
    }))
    }
    const validatorConfig = {
        email: {
            isRequired: {message:"Электронная почта обязательна для заполнения"},
            isEmail: {message: "Email введён некорректно"}
        },
        password: {
            isRequired: {message:"Пароль обязателен для заполнения"},
            isCapitalSymbol: {message: "Пароль должен содержать заглавную букву"},
            isContainDigit: {message: "Пароль должен содержать цифру"},
            minLength: {message: "Минимальная длина пароля - 8 символов", value: 8}
        },
    }
    useEffect(()=>{
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if(!isValid) return;
        console.log(data)
    }
    return (
            <>
                <h3 className='mb-4'>Sign in</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="E-mail:"
                            type='text'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Password:"
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <CheckBoxField
                            value={data.stayOn}
                            onChange={handleChange}
                            name='stayOn'
                        >Оставаться в сети</CheckBoxField>
                        <button className='btn btn-primary' type='submit' disabled={!isValid}>Submit</button>
                    </form>
            </>
        );
}
 
export default LoginForm;