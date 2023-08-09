import React, { useState } from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


function RecuperarConta() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            sendPasswordResetEmail(auth, email)
                .then((userCredential) => {
                    setErrorMessage('Foi enviado um email de redefinição de password.');
                })
                .catch((error) => {
                    setErrorMessage('Erro. Verifique o email inserido.');
                });

        } catch (error) {

        }
    };

    return (
        <div className="Login">
            <br /><br /><br /><br /><br /><br />
            <p className="titulo" style={{ fontSize: '40px' }}>Recuperar Conta</p>
            <br />
            <div>
                <p style={{ textAlign: 'left' }}>Email:</p>
                <input
                    type="text"
                    placeholder="Email"
                    style={{ width: '100%' }}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <br />
            <br />
            {errorMessage && <p>{errorMessage}</p>}
            <br />
            <div>
                <button className="btn btn-primary" onClick={handleResetPassword}>
                    Enviar
                </button>
            </div>
            <br />
        </div>
    );
}

export default RecuperarConta;