import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

const ToConfirm = ({confirmFun,cancelFun,title,text}) => {
  return (
    <SweetAlert
      info
      showCancel
      confirmBtnText="Continue"
      confirmBtnBsStyle="btn btn-primary text-light"
      title={title}
      onConfirm={confirmFun}
      onCancel={cancelFun}
      focusCancelBtn
    >
      {text}
    </SweetAlert>
  )
}

export default ToConfirm
