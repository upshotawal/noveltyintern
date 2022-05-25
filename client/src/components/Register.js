
import { useState } from 'react'

function Register() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [new_password, setNewpass] = useState('')
    const [errors, setErrors] = useState([]);

    const registerUser = async (event) => {
        event.preventDefault()
        const res = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, password, new_password,
            }),

        })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ msg: "Email Already registered" });
                }
            });

        const data = await res.json()
        console.log(data)
    }



    return (
        <div className="header-container">

            <h1 className='font-bold text-sky-900 text-center'>Register Page</h1>
            <br />
            <form className="w-full max-w-lg" onSubmit={registerUser}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email" type="text" placeholder="Please input your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                    </div>


                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Username
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}>
                        </input>

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password" type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Re_Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="new_password" type="password" placeholder="Your Password Again" value={new_password} onChange={(e) => setNewpass(e.target.value)}></input>
                    </div>

                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <input type="submit" value='Submit' />
                </button>





            </form>
            {errors.length ? (
                <div
                    className="alert alert-warning alert-dismissible fade show"
                    role="alert"
                >
                    {errors.map((item, index) => (
                        <p key={index}>{item.msg}</p>
                    ))}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            ) : null}
        </div>
    )
}



export default Register