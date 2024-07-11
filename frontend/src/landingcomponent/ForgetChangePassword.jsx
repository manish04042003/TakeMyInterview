import React, { useState } from 'react';

const ForgetChangePassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Here you can send a request to your backend to send a password reset email
        // For simplicity, let's assume it's successful and move to the next step
        setStep(2);
    };

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        // Here you can send a request to your backend to verify the reset token
        // For simplicity, let's assume it's successful and move to the next step
        setStep(3);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Here you can send a request to your backend to change the password
        // For simplicity, let's assume it's successful and reset the state
        setEmail('');
        setNewPassword('');
        setResetToken('');
        setStep(1);
    };

    return (
        <center>
            <div>
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <h2>Forgot Password?</h2>
                        <label>
                            Enter your email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleTokenSubmit}>
                        <h2>Enter Reset Token</h2>
                        <label>
                            Reset Token:
                            <input
                                type="text"
                                value={resetToken}
                                onChange={(e) => setResetToken(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleChangePassword}>
                        <h2>Reset Password</h2>
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit">Reset Password</button>
                    </form>
                )}
            </div>
        </center>

    );
};

export default ForgetChangePassword;
