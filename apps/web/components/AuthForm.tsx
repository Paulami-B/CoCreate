"use client"

import React, { useState } from 'react'
import InputBox from './InputBox';
import PasswordInputBox from './PasswordInputBox';
import AuthButton from './AuthButton';
import axios from 'axios';
import { BACKEND_URL } from '../app/config';
import { useRouter } from 'next/navigation';

type FormType = 'signin' | 'signup';

type ErrorType = {
    field: string,
    message: string
}

export default function AuthForm({ type } : { type: FormType }) {
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<ErrorType | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = async() => {
        setError(null)
        if(type==='signup' && !values.confirmPassword){
            setError({
                field: 'form',
                message: 'All fields are required'
            });
            return;
        }
        if(type==='signup' && values.password!==values.confirmPassword){
            setError({
                field: 'confirmPassword',
                message: 'Password & Confirm Password must be same'
            });
            return;
        }
        try{
            const response = await axios.post(`${BACKEND_URL}/${type==='signin' ? 'signin' : 'signup'}`, {
                name: values.name,
                email: values.email,
                password: values.password
            });
            router.push('/');
        } catch(err){
            if (axios.isAxiosError(err)) {
                const val = err.response?.data?.errors?.[0];

                if (val && val.field && val.message) {
                    setError({
                        field: val.field,
                        message: val.message,
                    });
                } 
                else {
                    setError({
                        field: err.response?.data?.field || 'form',
                        message: err.response?.data?.message || 'Something went wrong',
                    });
                }
            } 
            else {
                setError({
                field: 'form',
                message: 'Unexpected error occurred',
                });

                console.error('Unexpected error:', err);
            }
        } finally {
            setValues({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
    }

    return (
        <div>
            {type==='signup' && (
                <InputBox 
                    name="name" 
                    type="text" 
                    label="Name" 
                    error = {error?.field==='name'}
                    onChange={handleChange} 
                />
            )}
            <InputBox 
                name="email" 
                type="email" 
                label="Email" 
                error = {error?.field==='email'}
                onChange={handleChange} 
            />
            <PasswordInputBox 
                name="password" 
                label="Password" 
                error = {error?.field==='password'}
                onChange={handleChange} 
            />
            {type==='signup' && (
                <PasswordInputBox 
                    name="confirmPassword" 
                    label="Confirm Password"
                    error = {error?.field==='confirmPassword'}
                    onChange={handleChange} 
                />
            )}
            <AuthButton label={type==='signin' ? 'Sign In' : 'Sign Up'} onClick={handleSubmit} />
            {error && (
                <p className='mt-4 text-red-600 text-center'>{error.message}</p>
            )}
        </div>
    )
}
