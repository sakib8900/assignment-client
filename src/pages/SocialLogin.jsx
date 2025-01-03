import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then((result) => {
                        console.log("Sign in successful:", result.user);
                        // Show SweetAlert confirmation
                        Swal.fire({
                            title: "Login Successful!",
                            text: `Welcome back, ${result.user.displayName}!`,
                            icon: "success",
                            confirmButtonText: "Continue",
                            confirmButtonColor: "#e11d48",
                        }).then(() => {
                            navigate("/");
                        });
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