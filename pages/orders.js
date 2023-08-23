import { useEffect, React, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserAuth } from '../context/UserAuthContext'
const Orders = () => {
    const { user } = useUserAuth()
    const router = useRouter();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            let a = await fetch(`api/myorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone: user?.phoneNumber })
            })
            let res = await a.json()
            setOrders(res.orders)
        }
        if (!user) {
            router.push('/login')
        }
        else {

            fetchOrders()
        }
    }, [user, router])

    return (
        <div className='min-h-screen container my-14 mx-auto text-black '>
            <h1 className='font-bold text-center text-4xl mb-8'>My Orders({orders?.length})</h1>

            {orders?.length <= 0 && <h1 className="text-xl font-semibold mt-48 flex justify-center"> No orders</h1>}
            {orders?.length > 0 && <div className="relative overflow-x-auto flex justify-center flex-wrap">
                <div className="flex flex-col overflow-x-auto">
                    <div className="sm:-mx-4 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-[0.35rem] font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-4 py-4">Order Id</th>
                                            <th scope="col" className="text-center py-4">Name</th>
                                            <th scope="col" className="px-4 py-4">Price</th>
                                            <th scope="col" className="px-2 py-4">Status</th>
                                            <th scope="col" className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((item, index) => {
                                            return <tr key={index} className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-1 py-4 font-medium">{item?.oId}</td>
                                                <td className="whitespace-nowrap px-1 py-4">{Object.values(item?.products)[0]?.name}</td>
                                                <td className="whitespace-nowrap pl-4 py-4">₹{item?.amount}</td>
                                                <td className="whitespace-nowrap px-1 py-4">{item?.status}</td>
                                                <td className="whitespace-nowrap py-4">
                                                    <Link href={`/order?id=${item._id}`}><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Details</button></Link>

                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}



export default Orders
