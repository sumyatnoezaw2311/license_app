import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom"
import { BiErrorCircle } from "react-icons/bi";

const NotFound = () => {
    const loadingContainer = document.getElementById('loading-portal');

    return ReactDOM.createPortal(
      <div
        className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0'
        style={{ "zIndex": "20", "backgroundColor": "#fff"}}
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='bg-primary mb-3 rounded-circle d-flex align-items-center justify-content-center' style={{ "width": "120px", "height": "120px" }}>
                <BiErrorCircle className='text-white' style={{ "fontSize": "50px" }}></BiErrorCircle>
            </div>
            <h2 className='mb-3'>Page Not Found!</h2>
            <Link to={"/login"}>Back To Login</Link>
        </div>
      </div>,
      loadingContainer
    );
}

export default NotFound