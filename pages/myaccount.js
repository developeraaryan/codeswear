import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Myaccount = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem("myuser")) {
            router.push('/')
        }
    }, [router, router.query])

    return (
        <div className='min-h-screen'>Myaccount</div>
    )
}

export default Myaccount