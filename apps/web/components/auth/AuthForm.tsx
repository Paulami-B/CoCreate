"use client"

import React, { useEffect, useState } from 'react'
import InputBox from './InputBox';
import PasswordInputBox from './PasswordInputBox';
import AuthButton from './auth/AuthButton';
import axios from 'axios';
import { BACKEND_URL } from '../app/config';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@repo/common/hooks'
import { clearError, signinFailure, signinStart, signinSuccess } from '../../../packages/common/src/redux/authSlice';

type FormType = 'signin' | 'signup';

export default function AuthForm({ type } : { type: FormType }) {
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const reduxError = useAppSelector((state) => state.error);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = async () => {
        dispatch(clearError());

        if(type === "signup"){
            if(!values.email || !values.name || !values.password || !values.confirmPassword){
                const error = {
                    field: "form",
                    message: "All fields are required"
                }
                return dispatch(signinFailure({ error: error }));
            }
            else if(values.password !== values.confirmPassword){
                const error = {
                    field: "confirmPassword",
                    message: "Password & Confirm Password must be same",
                };
                return dispatch(signinFailure({ error: error }));
            }
        }

        if (type === "signin" && (!values.email || !values.password)) {
            const error = {
                field: "form",
                message: "All fields are required",
            };
            return dispatch(signinFailure({ error: error }));
        }

        try {
            dispatch(signinStart());

            const res = await axios.post(
            `${BACKEND_URL}/${type === "signin" ? "signin" : "signup"}`,
            {
                name: values.name,
                email: values.email,
                password: values.password,
            }
            );

            dispatch(signinSuccess(res.data));
            router.push("/canvas/newroom");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const val = err.response?.data?.errors?.[0];
                const errorPayload = val?.field && val?.message
                    ? { field: val.field, message: val.message }
                    : {
                        field: err.response?.data?.field || "form",
                        message: err.response?.data?.message || "Something went wrong",
                    };
                dispatch(signinFailure({ error: errorPayload }));
            } 
            else {
                const unexpectedError = {
                    field: "form",
                    message: "Unexpected error occurred",
                };
                dispatch(signinFailure({ error: unexpectedError }));
                console.error("Unexpected error:", err);
            }
        }
    };


    return (
        <div>
            {type==='signup' && (
                <InputBox 
                    name="name" 
                    type="text" 
                    label="Name" 
                    error = {reduxError?.field==='name'}
                    onChange={handleChange} 
                />
            )}
            <InputBox 
                name="email" 
                type="email" 
                label="Email" 
                error = {reduxError?.field==='email'}
                onChange={handleChange} 
            />
            <PasswordInputBox 
                name="password" 
                label="Password" 
                error = {reduxError?.field==='password'}
                onChange={handleChange} 
            />
            {type==='signup' && (
                <PasswordInputBox 
                    name="confirmPassword" 
                    label="Confirm Password"
                    error = {reduxError?.field==='confirmPassword'}
                    onChange={handleChange} 
                />
            )}
            <AuthButton label={type==='signin' ? 'Sign In' : 'Sign Up'} onClick={handleSubmit} />
            {reduxError && reduxError.message && (
                <p className='mt-4 text-red-600 text-center'>{reduxError.message}</p>
            )}
        </div>
    )
}
