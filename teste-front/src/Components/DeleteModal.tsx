import { Button } from './Button';
import styles from '../styles/Veiculos.module.css';
import { Veiculo } from '../interfaces/Veiculo';

interface DeleteModalProps {
  veiculo: Veiculo | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ veiculo, onConfirm, onCancel }: DeleteModalProps) => {
  if (!veiculo) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>Tem certeza que deseja excluir o veículo {veiculo.placa}?</p>
        <Button label="Sim" onClick={onConfirm} className={styles.button} />
        <Button label="Não" onClick={onCancel} className={styles.button} />
      </div>
    </div>
  );
};

export default DeleteModal;
