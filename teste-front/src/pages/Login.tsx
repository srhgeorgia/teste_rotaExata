// Login.tsx
import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { Button } from './Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('E-mail:', email, 'Senha:', password);
  };

  const handleCreateAccount = () => {
    navigate('/novo-cadastro');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.principalContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.boxLogin}>
            <img
              src="/assets/car.png"
              alt="Logo"
              className={styles.logo}
              aria-label="Logo"
            />
            <h3 className={styles.primary}>Login</h3>
          </div>

          <form onSubmit={handleSubmit} className={styles.formContainer}>
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
            <Button label="ENTRAR" onClick={handleSubmit} />
            <p
              className={styles.alternativeButton}
              onClick={handleCreateAccount}
            >
              Criar conta
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
