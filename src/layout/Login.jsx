import React, { useState } from 'react';
const Login = () => {
    const [data, setData] = useState({email:"",password:""});
    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState, 
            [target.name]: target.value
        }))

        }
    return ( 
        <>
            <form>
                <div>
                    <label htmlFor='email'>E-mail:</label>
                    <input 
                        type='text' 
                        id='email' 
                        name='email' 
                        value={data.email} 
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        />
                </div>
            </form>
        </>
     );
}
 
export default Login;
