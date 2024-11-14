import React from 'react'
import "../styles/Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer_left'>
            <a href='/'><img src='/assets/logo.png' alt='logo'/></a>

        </div>
        <div className='footer_center'>
            <h3>Usefull Links</h3>
            <ul>
                 <li>About us</li>
                 <li>Terms And Conditions</li>
            </ul>
        </div>
        <div className='footer_right'>
            <h3>Contact</h3>

        </div>

    </div>
  )
}

export default Footer