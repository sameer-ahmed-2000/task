import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const navigate = useNavigate();
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailerror] = useState("");
    const [passwordError, setPassworderror] = useState("");
    const [nameError, setNameerror] = useState("");
    const [registered, setRegistered] = useState(false);
    const handleSignup = async () => {
        if (!username || !email || !password) {
            setError("Please fill in all fields");
            if (!username) {
                setNameerror("Please enter your name");
            }
            if (!email) {
                setEmailerror("Please enter your email");
            }
            if (!password) {
                setPassworderror("Please enter your password");
            }
            return null;
        }

        setLoading(true);
        setError("");
        try {
            await axios.post(
                "http://localhost:8000/api/v1/auth/register",
                {
                    username,
                    email,
                    password,
                },
            );
            console.log('User registered successfully');
            setRegistered(true);
            if (registered) {
                console.log('Redirecting to sign-in page');
                navigate("/signin")
            }
        } catch (err) {
            setError("Sign up failed. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        emailError,
        passwordError,
        nameError,
        handleSignup,
    };
}