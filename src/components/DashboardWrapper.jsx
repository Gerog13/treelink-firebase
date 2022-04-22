import React from 'react'
import { Link } from 'react-router-dom'

const DashboardWrapper = ({children}) => {
  return (
    <div>
        <nav>
            <div>Logo</div>
            <Link to="/dashboard">Links</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/signout">Signout</Link>
        </nav>
        {children}
        </div>
  )
}

export default DashboardWrapper