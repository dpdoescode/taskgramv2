import React from 'react';
import { supabase } from '../client';
import './Login.css'; 

const Login = () => {
    const googleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: 
                { scopes: 'https://www.googleapis.com/auth/calendar' },
        });
        if (error) {
            console.error('Google sign-in error:', error);
            alert('Error logging in with Google!');
        }
    };

    return (
        <div className="Login">
            <h1> Welcome to TaskGram </h1>
            <p> Sign in with your Google account to sync your calendar and tasks. </p>
            <button className="googleBtn" onClick={googleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Login;

