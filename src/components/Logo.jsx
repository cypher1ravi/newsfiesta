import React from 'react'
import logo from "../logo192.png"
export default function Logo() {
    return (
        <div className='mr-2'>
            <img src={logo} alt="logo" style={{
                height: '50px',
                width: '50px',
                borderRadius: 50,
                border: '2px solid red'

            }} />
        </div>
    )
}
