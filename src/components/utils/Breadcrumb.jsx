import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './breadcrumb.module.css'

const Breadcrumb = ({prev}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname;
    const goToBack = ()=>{
        navigate(-1)
    }

  return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li onClick={()=>goToBack()} className={`${styles.breadcrumbItem} breadcrumb-item text-decoration-none text-primary`} style={{cursor: "pointer"}}> {prev} </li>
                <li className={`${styles.breadcrumbItem} breadcrumb-item text-primary`}>{path === "/" ? "valid-licenses" : path.split("").slice(1).join("")} </li>
            </ol>
        </nav>
  )
}

export default Breadcrumb