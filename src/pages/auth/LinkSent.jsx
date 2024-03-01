import React from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { MdOutlineMarkEmailRead } from "react-icons/md";

const LinkSent = () => {
    const loadingContainer = document.getElementById('loading-portal');

    return ReactDOM.createPortal(
      <div
        className='vh-100 vw-100 bg-white d-flex align-items-center justify-content-center position-fixed top-0'
        style={{ "zIndex": "20"}}
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='bg-primary mb-3 rounded-circle d-flex align-items-center justify-content-center' style={{ "width": "120px", "height": "120px" }}>
                <MdOutlineMarkEmailRead className='text-white' style={{ "fontSize": "50px" }}></MdOutlineMarkEmailRead>
            </div>
            <h2 className='mb-3'>Please check your email!</h2>
            <p>Password reset link has been sent to your email.</p>
            <Link to={"/login"}>Back To Login</Link>
        </div>
      </div>,
      loadingContainer
    );
}

export default LinkSent