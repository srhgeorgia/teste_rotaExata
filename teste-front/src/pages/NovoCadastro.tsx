import { useState } from 'react';
import { TextField } from '@mui/material';
import styles from '../styles/NovoCadastro.module.css';
import { Button } from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const NovoCadastro = () => {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate();

  const showPopup = (message: string, type: 'success' | 'error') => {
    setPopupMessage(message);
    setPopupType(type);

    setTimeout(() => {
      setPopupMessage('');
      setPopupType('');
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (localStorage.getItem(email)) {
      showPopup('Este e-mail já está cadastrado.', 'error');
      return;
    }

    if (localStorage.getItem(usuario)) {
      showPopup('Este usuário já está cadastrado.', 'error');
      return;
    }

    if (!email.includes('@')) {
      showPopup('O e-mail deve conter "@"', 'error');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      showPopup(
        'A senha deve conter pelo menos 1 letra maiúscula e ter no mínimo 6 caracteres.',
        'error',
      );
      return;
    }

    if (password !== confirmPassword) {
      showPopup('As senhas não coincidem!', 'error');
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('dataNascimento', dataNascimento);

    showPopup('Cadastro realizado com sucesso!', 'success');

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className={styles.principalContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.boxLogin}>
          <img
            src="/assets/car.png"
            alt="Logo"
            className={styles.logo}
            aria-label="Logo"
          />
          <h3 className={styles.primary}>Novo Cadastro</h3>
        </div>
        {popupMessage && (
          <div
            className={`${styles.popup} ${
              popupType === 'success' ? styles.successPopup : styles.errorPopup
            }`}
          >
            {popupMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <TextField
            label="Nome de usuário"
            variant="outlined"
            type="text"
            onChange={(e) => setUsuario(e.target.value)}
            className={styles.textField}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Digite o nome de usuário"
          />
          <TextField
            label="Data de aniversário"
            variant="outlined"
            type="date"
            onChange={(e) => setDataNascimento(e.target.value)}
            className={styles.textField}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            type="email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Digite o e-mail"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textField}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Digite a senha"
          />
          <TextField
            label="Confirmar Senha"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.textField}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Confirme sua senha"
          />
        </form>
        <Button
          label="CADASTRAR"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onClick={handleSubmit}
          className={styles.button}
        />
        <p className={styles.alternativeButton} onClick={() => navigate('/')}>
          Fazer login
        </p>
      </div>
    </div>
  );
};

export default NovoCadastro;
