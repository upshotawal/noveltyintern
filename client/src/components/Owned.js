import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Owned = ({ user }) => {
    // const [ownStocks, setOwnstocks] = useState([]);
    // let temp = ownStocks;
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();
    console.log(user)

    const getData = () => {
        axios.get('http://localhost:1337/api/ownStocks')
            .then((res) => {
                console.log(res.data);
                setStocks(res.data);


            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])
    const handleSell = () => {
        console.log(user)
        if (user !== undefined) {
            if (!stocks.length) {
                window.alert("Profile is empty");
            } else {
                stocks.map((item) => {
                    axios
                        .delete(`http://localhost:1337/api/deleteStocks${item.id}`,



                    )
                });

                console.log("Stocks has been sold");
            }
        } else {
            window.alert("you are not logged in");
        }
    };

    // useEffect(() => {
    //     if (localStorage.getItem("Stocks")) {
    //         setOwnstocks(JSON.parse(localStorage.getItem("Stocks")));
    //     }
    // }, [user])







    return (
        <div>
            {sessionStorage.getItem('User') ? (
                <div className='px-10'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Stock Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Transaction Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Bought Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sell Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Sell</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((item, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {item.stock_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.stock_amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item._id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.stock_price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.stock_price + 150}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'

                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!sessionStorage.getItem("User")) {
                                                        let confirmation = window.confirm(
                                                            "You need to be sign in to use this function. Do you want to log in now?"
                                                        );
                                                        if (confirmation) {
                                                            navigate("/");
                                                        }
                                                    } else {
                                                        handleSell();
                                                    }
                                                }}  >  <a href="#pablo">Sell</a>
                                            </button>
                                        </td>



                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>) :
                <h1 className='font-bold text-sky-900 text-center'> No Stocks Avilable</h1>}
        </div>
    )
}

export default Owned