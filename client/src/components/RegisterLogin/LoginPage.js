import { FormLabel, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './RegisterLogin.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLogin, setValidLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (username.trim().length !== 0 && password.trim().length !== 0) {
            setValidLogin(true);
        } else {
            setValidLogin(false);
        }
    }, [username, password])

    const StyledFormLabel = styled(FormLabel)({
        fontWeight: "bold",
    })

    const handleSubmit = (e) => {
        /* TODO: 
            - Need to create a session token for the user stored in the database
            - Validation/error-checking to see if user exists in database
        */
        e.preventDefault();
        setUsername("");
        setPassword("");
        navigate("/");
    }

    return (
        <>
            <div className="register-container">
                <Typography variant="h2" sx={{ mb: 8 }}>Log in to Doom Tracker 💀</Typography>

                <form className="form-container" autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <StyledFormLabel>Username</StyledFormLabel>
                    <TextField variant='outlined' name="username" onChange={(e) => setUsername(e.target.value)} autoComplete="off" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Password</StyledFormLabel>
                    <TextField
                        variant='outlined'
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="info" onClick={() => { setShowPassword(!showPassword) }}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                        sx={{ mb: 3, mt: 1 }} />
                    <Link to="../register" className='redirect-text'> Don't have an account?</Link>
                    <Button variant="contained" type="submit" color="secondary" disabled={!validLogin} sx={{ fontWeight: "bold" }}>Login</Button>
                </form>
            </div>
        </>
    );
}