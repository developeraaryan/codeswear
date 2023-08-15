import React from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import CartImg from "../public/assets/oversized(styles).png"

const CartItem = ({ cart, removeFromCart, addToCart, toggleCartModal }) => {
    return (
        <>

            {
                Object.keys(cart).map((item, index) => {
                    return (
                        <article key={index} className=" border border-gray-200 overflow-hidden bg-white shadow-lg rounded mb-5">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 flex p-3 ">
                                    <div
                                        className=""
                                        style={{
                                            width: "80%",
                                            height: "70%",
                                            position: "relative",
                                        }}
                                    >
                                        <Image
                                            src={cart[item]?.img}
                                            alt="product anme"
                                            height="240"
                                            width="240"
                                        />
                                    </div>
                                </div>

                                <div className="md:w-2/4 border-t lg:border-t-0 lg:border-l border-gray-200">
                                    <div className="p-4">
                                        <Link
                                            href={`/product/${cart[item]?.slug}`}
                                            className="hover:text-blue-600"
                                        >
                                            {cart[item]?.title}
                                        </Link>
                                        <div className="flex flex-wrap items-center flex-col justify-start relative -left-28 md:-left-[20.5rem] space-x-2 my-4">
                                            {/* <div className="ratings">
                                <div className="my-1">
                                    <StarRatings
                                        rating={4.5}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        starDimension="18px"
                                        starSpacing="1px"
                                        name="rating"
                                    />
                                </div>
                            </div> */}
                                            {/* <b className="text-gray-300">•</b>
                            <span className="ml-1 text-yellow-500">{4.5}</span> */}
                                            <div className="font-bold my-4">
                                                SIZE: <span className="text-gray-500">{cart[item]?.size}</span>
                                            </div>
                                            <div className="border">
                                                <button
                                                    onClick={() => {
                                                        toggleCartModal();
                                                        removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].color);
                                                    }}

                                                    className="border-r px-2">-</button>
                                                <span className="px-2">{cart[item].qty}</span>
                                                <button
                                                    onClick={() => {
                                                        toggleCartModal();
                                                        addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].color);
                                                    }}
                                                    className="border-l px-2">+</button>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 mb-2">
                                            {`This is the most professional product description with the latest technology having most efficient workflow this is our best sellings of the month about the technolgy and other stuffs `.substring(0, 150)}...
                                        </p>
                                        <span className="text-xl font-semibold text-black">
                                            ₹{cart[item]?.price}
                                        </span>
                                        <div className="my-3">
                                            <button
                                                onClick={() => {
                                                    toggleCartModal();
                                                    removeFromCart(item, cart[item].qty, cart[item].price, cart[item].name, cart[item].size, cart[item].color);
                                                }}
                                                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
                                                {" "}
                                                Remove{" "}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
                    <div className="p-5">
                        <span className="text-xl font-semibold text-black">
                            ${499}
                        </span>

                        <p className="text-green-500">Free Shipping</p>
                        <div className="my-3">
                            <a className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
                                {" "}
                                Add to Cart{" "}
                            </a>
                        </div>
                    </div>
                </div> */}
                            </div>
                        </article>
                    )

                }
                )}
        </>
    );
};

export default CartItem;
