import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Button } from '../Components/Button';
import Veiculos from './Veiculos';
import Historico from './Historico';

const Home = () => {
  const [usuario, setUsuario] = useState('');
  const [activeSection, setActiveSection] = useState<string>('VEÍCULOS');

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

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topButtons}>
          <img
            src="/public/assets/Logo.png"
            alt="logo"
            className={styles.logo}
          />
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
          <img src="/public/assets/Photo.png" alt="user" />
        </div>
      </div>

      <div className={styles.content}>{renderSection()}</div>
    </div>
  );
};

export default Home;
