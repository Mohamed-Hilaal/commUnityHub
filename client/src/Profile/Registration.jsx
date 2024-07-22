import React, { useState } from 'react';
import HttpClient from '../Http/HttpClient';
import './registration.css';
import { useNavigate } from 'react-router-dom';
  
    
const Registration = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contactNumber: '',
        accountType: 'Basic',
        terms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleUserRegistration = async (e) => {
        e.preventDefault();
        
        try{
            const res = await HttpClient.updateData('profile/register', formData)
            // console
            if  (!res || res.status !== 'success'){
                throw 'something went wrong'
            }

            navigate('/dashboard')
        }catch(err){
            console.error('something went wrong : ', err)
        }
        
    };

    return (
        <div className='registration-container'>
            <form onSubmit={handleUserRegistration} className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
                <div className="mb-5 col-span-1">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </span>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bonnie Green"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-5 col-span-1">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-5 col-span-1">
                    <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact Number</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-5 col-span-1">
                    <label htmlFor="accountType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account type</label>
                    <select
                        id="accountType"
                        name="accountType"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.accountType}
                        onChange={handleChange}
                    >
                        <option>Basic</option>
                        <option>Premium</option>
                    </select>
                </div>

                <div className="flex items-start mb-5 col-span-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            checked={formData.terms}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 col-span-1"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;
