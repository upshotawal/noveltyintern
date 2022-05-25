import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyList = ({ userId }) => {
    console.log(userId)
    //defining useState
    const [profileItem, setProfileItem] = useState([]);
    let temp = profileItem;
    const [totalAmount, setTotalAmount] = useState(0);

    //@desc load data when ui loads
    useEffect(() => {
        if (localStorage.getItem("Profile")) {
            setProfileItem(JSON.parse(localStorage.getItem("Profile")));
        }
    }, [userId]);

    //@desc update state(Profile data) when local storage updates
    window.addEventListener("storage", () => {
        let localData = JSON.parse(localStorage.getItem("Profile"));
        setProfileItem(localData);
    });

    //@desc calculate totalAmount
    useEffect(() => {
        let tempAmount = 0;
        profileItem.map((item) => {
            tempAmount += item.stock_price * item.quantity;
        });
        setTotalAmount(tempAmount);
    }, [profileItem]);

    //@desc remove stocks from the Profile
    const handleRemoveFromProfile = (index) => {
        temp = profileItem;
        temp.splice(index, 1);
        setProfileItem(temp);
        localStorage.setItem("Profile", JSON.stringify(temp));
        //@desc create event of local storage
        window.dispatchEvent(new Event("storage"));
    };

    //@desc handle user checkout
    const handleCheckout = () => {
        if (userId !== undefined) {
            if (!profileItem.length) {
                window.alert("Profile is empty");
            } else {
                let success = 1;
                profileItem.map((item) => {
                    axios
                        .post('http://localhost:1337/api/sendStocks', {
                            user: userId,
                            stockId: item.id,
                            stock_name: item.stock_name,
                            stock_price: item.stock_price,
                            stock_amount: item.quantity,
                        })
                        .then((res) => {
                            if (success === profileItem.length) {
                                localStorage.removeItem("Profile");
                                setProfileItem([]);
                                temp = [];
                            } else {
                                console.log(success);
                                success++;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });

                console.log("Posted to your Profile");
            }
        } else {
            window.alert("you are not logged in");
        }
    };
    return (
        <div className='px-10'>
            <ul className="list-group pointer ">
                {/* Profile  */}
                <li
                    className="list-group-item text-center fw-bold fs-5 "
                    aria-current="true"
                >
                    <span className='font-bold text-sky-900 text-center'> Profile Item</span>
                </li>
                <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-3 ...">

                    {profileItem.length ? (
                        profileItem.map((item, index) => (
                            <div className="flex justify-center ml-6 mt-4 mr-6">
                                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-white-800 dark:border-white-700"
                                        key={index}>
                                        <li
                                            className=""
                                            key={index}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">
                                                    {index + 1}.   {item.stock_name}
                                                </div>
                                                <div> Price: {item.stock_price}</div>
                                                <div> Quantity: {item.quantity}</div>
                                            </div>
                                            <div>
                                                <div className="text-end">Stock Total: {item.stock_price * item.quantity}</div>

                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                    //@desc call handleRemoveFromProfile function
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleRemoveFromProfile(index);
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <li
                            className="list-group-item text-center text-muted "

                        >
                            No Item Available
                        </li>
                    )}</div>
                <li className="list-group-item fw-bold ">
                    <h1 className="text-2xl text-center">
                        Total Amount :
                        <span>{totalAmount}</span>
                    </h1>
                </li>
                {/* @desc checkout button  */}
                <div className="mt-20 pl-90">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCheckout();
                        }}
                    >
                        Buy All
                    </button>
                </div>

            </ul>
        </div>
    );
};

export default BuyList