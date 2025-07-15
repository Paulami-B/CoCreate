"use client"

// import AuthForm from '../components/AuthForm';
import React, { useEffect, useState } from 'react'
import AuthForm from '../../components/AuthForm';
import { useAppDispatch } from '@repo/common/hooks';
import { clearError } from '../../../../packages/common/src/redux/authSlice';

export default function Auth() {
    const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, [activeTab]);
    
    return (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-5 px-12 py-5 h-screen w-full box-border items-center overflow-hidden">
            <div className="col-span-3 w-full h-full lg:rounded-l-3xl shadow-lg dark:shadow-2xl dark:shadow-yellow-400 py-5 px-12 bg-white dark:bg-black">
                <div className="lg:py-6 font-matemasie text-6xl mb-10 text-lilac">
                    # CoCreate
                </div>
                <div className="text-2xl lg:text-4xl pb-3 md:pb-4 text-center dark:text-gray-100">
                    Hey there!! Please fill in the details to get started.
                </div>
                <div className="flex justify-center lg:text-xl w-full items-center">
                    <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-3 dark:text-gray-100 
                    ${activeTab=='signup' ? "font-bold border-lilac dark:border-lilac": "font-semibold border-gray-200 dark:border-gray-400"}`} 
                    onClick={() => setActiveTab('signup')}>
                        Sign Up
                    </button>
                    <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-3 dark:text-gray-100 
                    ${activeTab=='signin' ? "font-bold border-lilac dark:border-lilac": "font-semibold border-gray-200 dark:border-gray-400"}`} 
                    onClick={() => setActiveTab('signin')}>
                        Sign In
                    </button>
                </div>
                <div className="items-center p-6">
                    {activeTab==='signup' ? (
                        <AuthForm type='signup' />
                    ) : (
                        <AuthForm type='signin' />
                    )}
                </div>
            </div>
            <div className="col-span-0 lg:col-span-2 hidden lg:block shadow-lg dark:shadow-2xl bg-lilac-light dark:bg-lilac-dark rounded-r-3xl items-center px-12 py-28 h-full w-full">
                <div className="py-2 text-4xl">Shape ideas together — a collaborative canvas for drawing and teamwork.</div>
                <img src="auth.png" className=" py-4" />
            </div>
        </div>
    )
}
