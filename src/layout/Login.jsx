import React, {useState} from 'react';
import LoginForm from '../components/ui/LoginForm';
import { useParams } from 'react-router-dom';
import SignUpForm from '../components/ui/SignUpForm';

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type==="signup" ? type : "login")
    const toggleFormType = () => {
        setFormType(prevState => prevState === "signup" ? "login" : "signup")
    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 p-4 shadow'>
                    {formType === "signup" ? 
                        <>
                            <SignUpForm/>
                            <p>Already have account? <a role='button' onClick={toggleFormType}>Sign In</a></p>
                        </>
                    : 
                        <>
                            <LoginForm/>
                            <p>Dont have account? <a role='button' onClick={toggleFormType}>Sign Up</a></p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
 
export default Login;
