import React, { useState, useEffect } from 'react';
import './contentLogin.css';
import axios from 'axios';

interface ContentLoginProps {
    onCloseOtherComponents: () => void; 
     // Função para fechar outros componentes
}

const ContentLogin: React.FC<ContentLoginProps> = ({ onCloseOtherComponents}) => {
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
            onCloseOtherComponents();  // Fecha os outros componentes quando o modal abre
        }
    }, [isModalOpen, onCloseOtherComponents]);

    const handleLogin = async() => {
        try{
            const response = await axios.post('http://localhost:3002/api/login', {cpf: cpf, senha: password})
            if (response.status === 202){
                localStorage.setItem("token", response.data.token)
                alert('Login bem-sucedido')
            }
            else{
                alert("Erro ao efeturar o login")
            }
        }
        catch(error){
            console.error(error)
        }
    };

    const handleRegister = async() => {
        try{
            if(registerUsername !== '' && registerBirthDate !== '' && registerCpf !== '' && registerEmail !== ''&& registerPassword !== ''){
                axios.post('localhost:3002/api/usuario/cadastrar', {registerUsername, registerBirthDate, registerCpf ,registerEmail, registerPassword})
                .then(()=>{
                    setRegisterUsername('');
                    setRegisterEmail('');
                    setRegisterBirthDate('');
                    setRegisterCpf('');
                    setRegisterPassword('')
                    alert('Credenciais cadastradas com sucesso!')
                    setIsLogin(true)
                })
                .catch((error)=>{
                    console.error(error)
                    alert('Erro ao registrar credenciais.')
                })
            }
            else{
                /* VAI QUE */
                alert("Preencha todos os campos.")
            }
        }
        catch(erro){
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

    /* Função de teste */
    const logout = () =>{
        localStorage.removeItem("token");
        alert("Usuario deslogado.")
    }

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
        
                                        <div>
                                            <label htmlFor="cpf">CPF:</label>
                                            <input
                                                type="text"
                                                id="cpf"
                                                className="inputLogin"
                                                value={cpf}
                                                onChange={(e) => setCpf(e.target.value)}
                                                maxLength={11}
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
                                        <button className="submitButton" onClick={handleLogin}>Login</button>
                                        <button className="toggle-button" onClick={logout}>Logout</button>
                                        <button className="toggle-button" onClick={toggleForm}>
                                            {isLogin ? 'Switch to Cadastro' : 'Switch to Login'}
                                        </button>
                                    
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
                                            <label htmlFor="registerBirthDate">Data de nascimento:</label>
                                            <input
                                                type="date"
                                                id="registerBirthDate"
                                                className="inputCadastro"
                                                value={registerBirthDate}
                                                onChange={(e) => setRegisterBirthDate(e.target.value)}
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
                                                maxLength={11}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="submitButton" onClick={handleRegister}>Register</button>
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
