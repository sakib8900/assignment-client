import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            navigate('/')

        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <div className='grid justify-center'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='btn btn-wide'>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;