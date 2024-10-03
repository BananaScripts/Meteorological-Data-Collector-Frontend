import React, { useState } from 'react';
import './contentLogin.css';

const ContentLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Initially set to false
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerCpf, setRegisterCpf] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        //
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        //
        console.log('Register Username:', registerUsername);
        console.log('Register Password:', registerPassword);
        console.log('Register Email:', registerEmail);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <button onClick={openModal} className='button-Login'>.</button>
            {isModalOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <div className="forms-container">
                            {isLogin ? (
                                <div className="form-section">
                                    <h2>Login</h2>
                                    <form onSubmit={handleLogin}>
                                        <div>
                                            <label htmlFor="username">Username:</label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="inputLogin"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="inputLogin"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="submitButton">Login</button>
                                        <button className="toggle-button" onClick={toggleForm}>
                                            {isLogin ? 'Switch to Cadastro' : 'Switch to Login'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="form-section">
                                    <h2>Cadastro</h2>
                                    <form onSubmit={handleRegister}>
                                        <div>
                                            <label htmlFor="registerUsername">Username:</label>
                                            <input
                                                type="text"
                                                id="registerUsername"
                                                className="inputCadastro"
                                                value={registerUsername}
                                                onChange={(e) => setRegisterUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerPassword">Password:</label>
                                            <input
                                                type="password"
                                                id="registerPassword"
                                                className="inputCadastro"
                                                value={registerPassword}
                                                onChange={(e) => setRegisterPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerEmail">Email:</label>
                                            <input
                                                type="email"
                                                id="registerEmail"
                                                className="inputCadastro"
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerCPF">CPF:</label>
                                            <input
                                                type="text"
                                                id="registerCPF"
                                                className="inputCadastro"
                                                value={registerCpf}
                                                onChange={(e) => setRegisterCpf(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="submitButton">Register</button>
                                        <button className="toggle-button" onClick={toggleForm}>
                                            {isLogin ? 'Switch to Cadastro' : 'Switch to Login'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContentLogin;
