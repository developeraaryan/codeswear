import React from 'react'
const OrderTracker = ({ status }) => {
  return (
    <>
      {/* <!-- component --> */}
      <div className="container mx-auto w-[50rem] py-6">
        <div className="grid container mx-12">
          <div className="w-2/4">
            <div className="relative mb-2">
              <div className={`w-10 h-10 mx-auto ${status === "approved" | status === "shipped" | status === "delivered" | status === "canceled" ? "bg-green-500" : "bg-white border "}  rounded-full text-lg text-white flex items-center`}>
                <span className={`text-center ${status === "approved" | status === "shipped" | status === "delivered" | status === "canceled" ? "text-white" : "text-black"}  w-full flex justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>

                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base"> Order Approved </div>
          </div>

          <div className="w-2/4 mt-32">
            <div className="relative rotate-90 mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={`w-0 ${status === "shipped" | status === "delivered" | status === "canceled" ? "bg-green-300" : ""} py-1 rounded`} style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className={`w-10 -rotate-90 h-10 mx-auto ${status === "shipped" | status === "delivered" | status === "canceled" ? "bg-green-500" : "bg-white border"}  rounded-full text-lg text-white flex items-center`}>
                <span className={`text-center ${status === "shipped" | status === "delivered" | status === "canceled" ? "text-white" : "text-black"}  w-full flex justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>



                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base">Shipped</div>
          </div>

          <div className="w-2/4 mt-32">
            <div className="relative rotate-90 mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={`w-0 ${status === "delivered" | status === "canceled" ? "bg-green-300" : ""}  py-1 rounded`} style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className={`w-10 -rotate-90 h-10 mx-auto ${status === "delivered" | status === "canceled" ? "bg-green-500" : "bg-white"}  border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                <span className={`text-center ${status === "delivered" | status === "canceled" ? "text-white" : "text-black"}  w-full flex justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>


                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base">Delivered</div>
          </div>

          <div className="w-2/4 mt-32">
            <div className="relative rotate-90 mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={`w-0 ${status === "canceled" ? "bg-green-300" : ""} py-1 rounded`} style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className={`w-10 -rotate-90 h-10 mx-auto ${status === "canceled" ? "bg-green-500" : "bg-white"} border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                <span className={`text-center ${status === "delivered" | status === "canceled" ? "text-white" : "text-black"}  w-full flex justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>


                </span>
              </div>
            </div>

            <div className="text-xs  text-center md:text-base">Canceled</div>
          </div>
        </div>
      </div>

    </>
  );
};

export default OrderTracker;
