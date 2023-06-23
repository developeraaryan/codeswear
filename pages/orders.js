import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, React, useState } from 'react';
import { useSession } from 'next-auth/react';

const Orders = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [orders, setOrders] = useState([])
    const fetchOrders = async () => {
        let a = await fetch(`api/myorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(session?.user)
        })
        let res = await a.json()
        setOrders(res.orders)
    }
    useEffect(() => {
        if (!localStorage.getItem("myuser")) {
            // router.push('/')
            console.log("no user");
        } else {
            console.log("user");
        }
        fetchOrders()
    }, [])

    return (
        <div className='min-h-screen container my-14 mx-auto text-black '>
            <h1 className='font-bold text-center text-4xl mb-8'>My Orders</h1>

            {!orders && <h1 className="text-xl font-semibold mt-48 flex justify-center"> No orders</h1>}
            {orders && <div className="relative overflow-x-auto flex justify-center flex-wrap">
                <table className="w-[96%] text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {/* Product name */}
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item) => {
                            return <tr key={item._id} className="bg-gray-800 border-gray-700 border-b">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    {item.oId}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    {item.email}
                                </th>
                                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    {item.status}
                                </td>
                                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    ₹{item.amount}
                                </td>
                                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    <Link href={`/order?id=${item._id}`}><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Details</button></Link>
                                </td>
                            </tr>
                        })
                        }

                    </tbody>
                </table>
            </div>}

        </div>
    )
}



export default Orders