import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Button } from '../Components/Button';
import Veiculos from './Veiculos';
import Historico from './Historico';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [usuario, setUsuario] = useState('');
  const [activeSection, setActiveSection] = useState<string>('VEÍCULOS');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      setUsuario(storedUsuario);
    }
  }, []);

  const renderSection = () => {
    if (activeSection === 'VEÍCULOS') {
      return <Veiculos />;
    }
    if (activeSection === 'HISTÓRICO DE ATIVIDADES') {
      return <Historico />;
    }
    return null;
  };

  const handleLogout = () => {
    setActiveSection('VEÍCULOS');
    setShowMenu(false);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topButtons}>
          <img src="/assets/Logo.png" alt="logo" className={styles.logo} />
          <Button
            label="VEÍCULOS"
            onClick={() => setActiveSection('VEÍCULOS')}
            className={`${styles.button} ${
              activeSection === 'VEÍCULOS' ? styles.activeButton : ''
            }`}
          />
          <Button
            label="HISTÓRICO DE ATIVIDADES"
            onClick={() => setActiveSection('HISTÓRICO DE ATIVIDADES')}
            className={`${styles.button} ${
              activeSection === 'HISTÓRICO DE ATIVIDADES'
                ? styles.activeButton
                : ''
            }`}
          />
        </div>
        <div className={styles.topUser}>
          <div>
            <p>Olá</p>
            <p>
              <strong>{usuario}</strong>
            </p>
          </div>
          <img
            src="/assets/Photo.png"
            alt="user"
            className={styles.userIcon}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>

      {showMenu && (
        <div className={styles.menuOptions}>
          <Button
            label="Sair"
            onClick={handleLogout}
            className={styles.button}
          />
        </div>
      )}

      <div className={styles.content}>{renderSection()}</div>
    </div>
  );
};

export default Home;
