import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

const ToConfirmDel = ({confirmFun,cancelFun,title,text}) => {
  return (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      title={title}
      onConfirm={confirmFun}
      onCancel={cancelFun}
      focusCancelBtn
    >
      {text}
    </SweetAlert>
  )
}

export default ToConfirmDel
