import React, {useEffect, useState} from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/multiSelect';


const SignUpForm = () => {
    const [data, setData] = useState({email:"",password:"", profession: "", sex: "other", qualities: []});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data)=>setProfession(data))
        api.qualities.fetchAll().then((data)=>setQualities(data))
    }, [])
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
        profession: {
            isRequired: {message: "Поле обязательно для заполнения"}
        }
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
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose.."
                            options={professions}
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
                        />
                        <RadioField
                            label="Ваш пол:"
                            options={
                                [{name: "Мужской", value: "male"},
                                 {name: "Женский", value: "female"},
                                 {name: "Другое", value: "other"}]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            name='qualities'
                            label="Какой Вы:"
                        />
                        
                        <button 
                            className='btn btn-primary' 
                            type='submit' 
                            disabled={!isValid}
                            >
                            Submit
                        </button>
                    </form>
            </>
     );
}
 
export default SignUpForm;