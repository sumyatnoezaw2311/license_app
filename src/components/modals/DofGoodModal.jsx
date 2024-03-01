import React from 'react'

const DofGoodModal = ({content}) => {
  return (
    <>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Description of good</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-start text-break'>{ content }</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DofGoodModal