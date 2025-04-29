import React from 'react'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router'
const FooterLayout = () => {
  return (
    <div>
        <Footer />
        <Outlet />
    </div>
  )
}

export default FooterLayout