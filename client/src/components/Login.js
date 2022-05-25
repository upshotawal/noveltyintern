
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const navigate = useNavigate();

    // const loginUser = async (event) => {
    //     event.preventDefault()
    //     const res = await fetch('http://localhost:1337/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email, password,
    //         }),

    //     })
    //     const data = await res.json()

    //     if (data.user) {

    //         alert('Login Sucessfull')
    //         window.location.href = '/profile'
    //     }


    const handleLogIn = () => {
        axios
            .post("http://localhost:1337/api/login", {
                email: document.getElementById("email1").value,
                password: document.getElementById("password1").value,
            })
            .then((res) => {
                console.log(res.data.user);
                if (sessionStorage.getItem("User")) {
                    sessionStorage.removeItem("User");
                }
                sessionStorage.setItem("User", JSON.stringify(res.data.user));
                window.alert("You are now logged in.");
                navigate("/profile");

            })
            .catch((err) => {
                if (err.response.data.msg) {
                    console.log(err.response.data.msg);
                }
            });
    };


    return (
        <div className="header-container">
            <h1 className='font-bold text-sky-900 text-center'>Login Page</h1>
            <br />
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email1" type="text" placeholder="Please input your email"
                        // value={email} onChange={(e) => setEmail(e.target.value)}
                        ></input>

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password1" type="password" placeholder="Your Password"
                        // value={password} onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"

                    onClick={(e) => {
                        e.preventDefault();
                        handleLogIn();
                    }}>Log In
                    {/* <input type="submit" value='LogIn' /> */}
                </button>





            </form>
        </div>
    )
}



export default Login