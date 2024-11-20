import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imgLogin from './icons/login.png'
import imgLogout from './icons/logout.png'

interface ContentLoginProps {
    onCloseOtherComponents: () => void;
}

const ContentLogin: React.FC<ContentLoginProps> = ({ onCloseOtherComponents }) => {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerBirthDate, setRegisterBirthDate] = useState('');
    const [registerCpf, setRegisterCpf] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (isModalOpen) {
            onCloseOtherComponents();
        }
    }, [isModalOpen, onCloseOtherComponents]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:30105/api/login', { cpf, senha: password });
            if (response.status === 202) {
                localStorage.setItem("token", response.data.token);
                alert('Login bem-sucedido');
            } else {
                alert("Erro ao efetuar o login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async () => {
        try {
            if (registerUsername && registerBirthDate && registerCpf && registerEmail && registerPassword) {
                axios.post('http://localhost:30105/api/usuario/cadastrar', { registerUsername, registerBirthDate, registerCpf, registerEmail, registerPassword })
                    .then(() => {
                        setRegisterUsername('');
                        setRegisterEmail('');
                        setRegisterBirthDate('');
                        setRegisterCpf('');
                        setRegisterPassword('');
                        alert('Credenciais cadastradas com sucesso!');
                        setIsLogin(true);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Erro ao registrar credenciais.');
                    });
            } else {
                alert("Preencha todos os campos.");
            }
        } catch (erro) {
            console.error(erro);
        }
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

    const logout = () => {
        try {
            localStorage.removeItem("token");
            alert("Usuário deslogado.");
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        overlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        boxLogin: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column' as 'column',
        },
        titleSectionParagraph: {
            marginTop: '-10px',
            fontSize: 'x-small',
        },
        inputsCamp: {
            marginLeft: '5%',
            width: '80%',
        },
        inputsCampParagraph: {
            marginLeft: '1.5%',
            margin: '1%',
        },
        inputField: {
            display: 'flex',
            alignItems: 'end',
            width: '100%',
            padding: '1%',
            borderRadius: '20px',
            borderStyle: 'solid',
        },
        action: {
            button: {
                margin: '5%',
                padding: '10%',
                borderRadius: '20px',
                backgroundColor: 'black',
                borderStyle: 'solid',
                color: 'aliceblue',
                cursor: 'pointer',
            },
        },
        closeButton: {
            position: 'absolute' as const,
            top: '10px',
            right: '10px',
            padding: '10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
        },
        loginButtonImage: {
            position: 'absolute' as const,
            top: '15px',
            right: '30px',
            cursor: 'pointer',
            margin: '2.5%',
            width: '40px',
            height: '40px',
        },
        logoutButtonImage: {
            position: 'absolute' as const,
            top: '15px',
            right: '30px',
            cursor: 'pointer',
            marginRight: '2.5%',
            marginTop: '7%',
            width: '40px',
            height: '40px',
        },
    };

    return (
        <>
            <img 
                src={imgLogin}
                alt="Login" 
                style={styles.loginButtonImage} 
                onClick={openModal} 
            />
            <img 
                src={imgLogout}
                alt="Logout" 
                style={styles.logoutButtonImage} 
                onClick={logout} 
            />
            {isModalOpen && (
                <div style={styles.overlay}>
                    <div id="Box_Login" style={styles.boxLogin}>
                        <button onClick={closeModal} style={styles.closeButton}>X</button>
                        <div id="Title_Section" style={styles.titleSection}>
                            <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
                            <p style={styles.titleSectionParagraph}>
                                {isLogin ? 'Digite suas credenciais' : 'Preencha os campos para se cadastrar'}
                            </p>
                        </div>
                        <div id="Inputs_Camp" style={styles.inputsCamp}>
                            {isLogin ? (
                                <>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="cpf">CPF:</label>
                                        <input
                                            type="text"
                                            id="cpf"
                                            style={styles.inputField}
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)}
                                            maxLength={11}
                                            required
                                        />
                                    </p>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="password">Senha:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            style={styles.inputField}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="registerUsername">Username:</label>
                                        <input
                                            type="text"
                                            id="registerUsername"
                                            style={styles.inputField}
                                            value={registerUsername}
                                            onChange={(e) => setRegisterUsername(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="registerPassword">Senha:</label>
                                        <input
                                            type="password"
                                            id="registerPassword"
                                            style={styles.inputField}
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="registerBirthDate">Data de nascimento:</label>
                                        <input
                                            type="date"
                                            id="registerBirthDate"
                                            style={styles.inputField}
                                            value={registerBirthDate}
                                            onChange={(e) => setRegisterBirthDate(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="registerEmail">Email:</label>
                                        <input
                                            type="email"
                                            id="registerEmail"
                                            style={styles.inputField}
                                            value={registerEmail}
                                            onChange={(e) => setRegisterEmail(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p style={styles.inputsCampParagraph}>
                                        <label htmlFor="registerCpf">CPF:</label>
                                        <input
                                            type="text"
                                            id="registerCpf"
                                            style={styles.inputField}
                                            value={registerCpf}
                                            onChange={(e) => setRegisterCpf(e.target.value)}
                                            maxLength={11}
                                            required
                                        />
                                    </p>
                                </>
                            )}
                        </div>
                        <div id="Action">
                            <button style={styles.action.button} onClick={isLogin ? handleLogin : handleRegister}>
                                {isLogin ? 'Login' : 'Cadastrar'}
                            </button>
                            <button style={styles.action.button} onClick={toggleForm}>
                                {isLogin ? 'Registrar' : 'Voltar ao Login'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContentLogin;
