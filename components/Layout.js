import React from 'react'
import Navbar from './Navbar'

function Layout() {
    return (
        <div className='h-screen flex flex-row justify-start'>
            <Navbar />
            <div className="bg-blue-700 flex-1 p-4 text-white border-1 border-dashed"></div>
        </div>
    )
}

export default Layout