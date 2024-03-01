import React from 'react';
import ReactDOM from 'react-dom';
import { SyncLoader } from 'react-spinners'



const Loading = () => {
    const loadingContainer = document.getElementById('loading-portal');

    return ReactDOM.createPortal(
      <div
        className='vh-100 vw-100 d-flex align-items-center justify-content-center position-fixed top-0'
        style={{ "zIndex": "20", "backgroundColor": "rgba(0, 0, 0, 0.3)"}}
      >
          <SyncLoader
            color='#36d7b7'
            loading= {true}
          />
      </div>,
      loadingContainer
    );
}

export default Loading