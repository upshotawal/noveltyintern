import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    let profileArray = [];
    const getData = () => {
        axios.get('http://localhost:1337/api/stocks')
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

    // useEffect(() => {
    //     const getStocks = async () => {
    //         const stocksFromServer = await fetchStocks()
    //         setStocks(stocksFromServer)
    //     }

    //     getStocks()

    // }, [])
    // const fetchStocks = async () => {
    //     const res = await fetch('http://localhost:1337/api/stocks'{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             stock_name, email, password,
    //         }),

    //     })
    //     const data = await res.json()
    //     console.log(data)
    //     return data
    // }

    //@desc handle add to profile
    const handleAddToProfile = (id, stock_name, stock_price) => {

        //@desc get the quantity of the item
        const quantity = document.getElementById(`quantity${id}`).value;

        //@desc get existing profile value
        if (localStorage.getItem("Profile")) {
            profileArray = JSON.parse(localStorage.getItem("Profile"));
            console.log("profileArray", profileArray);
        } else {
            profileArray = [];
        }
        let success = false; //boolean value for existing value

        //@condition find if existing item is available
        //@true update the quantity value
        //@false add data to the local storage

        //@true
        profileArray.map((item) => {
            if (item.id === id) {
                item.quantity = parseInt(item.quantity) + parseInt(quantity);
                return (success = true);
            }
        });

        //@false
        if (!success) {
            profileArray.push({
                id,
                stock_name,
                stock_price,
                quantity: quantity,
            });
        }
        //@desc update profile data
        if (profileArray.length) {
            localStorage.setItem("Profile", JSON.stringify(profileArray));
        }
        //@desc create event of local storage
        window.dispatchEvent(new Event("storage"));
    };



    return (
        <div>
            <div className='px-10'>

                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search"
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search For The Stocks You Would Like To Purchase Or Sell" required=""
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                        />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <br />


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
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Buy Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Buy</span>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {stocks.filter((item) => {
                                if (searchTerm === "") {
                                    return item
                                } else if (item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                    return item
                                } return false;
                            }).map((item, index) => (
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
                                        <div className="col-md-5 mt-2">
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                id={`quantity${item._id}`}
                                                min="1"
                                                defaultValue={1}
                                                placeholder="Quantity..."
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!sessionStorage.getItem("User")) {
                                                    let confirmation = window.confirm(
                                                        "You need to be sign in to use this function. Do you want to log in now?"
                                                    );
                                                    if (confirmation) {
                                                        navigate("/login");
                                                    }
                                                } else {
                                                    handleAddToProfile(item._id, item.stock_name, item.stock_price);
                                                }
                                            }}>
                                            <a href="#pablo">Buy</a>
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>




    )
}

export default List