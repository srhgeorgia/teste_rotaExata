import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '../styles/NovoCadastro.module.css';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const NovoCadastro = () => {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(
      'E-mail:',
      email,
      'Senha:',
      password,
      'Usuário:',
      usuario,
      'Data de nascimento:',
      dataNascimento,
    );
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <TextField
            label="Nome de usuário"
            variant="outlined"
            type="text"
            onChange={(e) => setUsuario(e.target.value)}
            className={styles.textField}
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            type="email"
            value={email}
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Digite a senha"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}{' '}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Button label="CADASTRAR" onClick={handleSubmit} />
        <p className={styles.alternativeButton} onClick={handleLogin}>
          Fazer login
        </p>{' '}
      </div>
    </div>
  );
};

export default NovoCadastro;
