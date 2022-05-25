import React from 'react';
import { Spring } from 'react-spring';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Owned from './Owned';



const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [sellTotalAmount, setSellTotalAmount] = useState(0);
    const [profloss, setProfloss] = useState(0);
    // const [data, setData] = useState('');
    console.log(user)

    const [stocks, setStocks] = useState([]);

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

    useEffect(() => {
        let tempAmount = 0;
        stocks.map((item) => {
            tempAmount += item.stock_price * item.stock_amount;
        });
        setTotalAmount(tempAmount);
    }, [stocks]);

    useEffect(() => {
        let tempAmount = 0;
        stocks.map((item) => {
            tempAmount += (item.stock_price + 250) * item.stock_amount;
        });
        setSellTotalAmount(tempAmount);
    }, [stocks])

    useEffect(() => {
        let tempAmount = 0;

        tempAmount += (sellTotalAmount) - (totalAmount);

        setProfloss(tempAmount);
    }, [sellTotalAmount, totalAmount])



    // useEffect(() => {
    //     const getUser = (user) => {
    //         axios.get(`http://localhost:1337/api/user/${user}`)
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setData(res.data);


    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })


    //     };

    //     getUser();
    // }, []);

    return (
        <Spring
            from={{ opacity: 0, marginTop: -500 }}
            to={{ opacity: 1, marginTop: 0 }}
        >
            {props => (<div style={props}>
                <div>
                    {sessionStorage.getItem('User') ? (<div className="container mx-auto my-5 p-5">
                        <div className="md:flex no-wrap md:-mx-2 ">
                            {/* <!-- Left Side --> */}
                            <div className="w-full md:w-3/12 md:mx-2">
                                {/* <!-- Profile Card --> */}
                                <div className="bg-white p-3 border-t-4 border-green-400">
                                    <div className="image overflow-hidden">
                                        <img className="h-auto w-full mx-auto"
                                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                            alt="" />
                                    </div>
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit.
                                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>

                                </div>
                                <div>
                                    Total Amount: {totalAmount}<br />
                                    Selling Amount:{sellTotalAmount}<br />
                                    profit: {profloss}

                                </div>

                            </div>
                            {/* <!-- Right Side --> */}
                            <div className="w-full md:w-9/12 mx-2 h-64">
                                {/* <!-- Profile tab -->
                                <!-- About Section --> */}
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">About</span>
                                    </div>

                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Name</div>
                                                <div className="px-4 py-2">{user.name}</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Gender</div>
                                                <div className="px-4 py-2">Female</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Address</div>
                                                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Email.</div>
                                                <div className="px-4 py-2">
                                                    <a className="text-blue-800" href="mailto:jane@example.com">{user.email}</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    <button
                                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/");
                                        }}>
                                        Manage Stock Porfolio</button>
                                </div>
                                {/* <!-- End of about section --> */}

                                <div className="my-4"></div>

                                {/* <!-- Owned stocks --> */}
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <h1 className='text-center font-bold text-sky-900'> Owned Stocks</h1>
                                    <Owned user={user} />



                                </div>
                                {/* <!-- End of profile tab --> */}
                            </div>
                        </div>
                    </div>) : <h1 className='font-bold text-sky-900 text-center'>Please Sign In first</h1>}

                    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>





                </div>

            </div>
            )}


        </Spring>

    )
}

export default Dashboard