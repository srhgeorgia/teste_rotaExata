import { useState } from 'react';
import { Button } from '../Components/Button';
import FormVeiculo from '../Components/FormVeiculo';
import VeiculosTable from '../Components/VeiculosTable';
import DeleteModal from '../Components/DeleteModal';
import styles from '../styles/Veiculos.module.css';
import { Veiculo } from '../interfaces/Veiculo';

const Veiculos = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [veiculoToDelete, setVeiculoToDelete] = useState<Veiculo | null>(null);

  // Filtros
  const [placaFilter, setPlacaFilter] = useState('');
  const [marcaFilter, setMarcaFilter] = useState('');
  const [propositoFilter, setPropositoFilter] = useState('');

  const propositos = ['Uso pessoal', 'Veículo para locação', 'Uso da empresa'];
  const marcas = [
    'Toyota',
    'Chevrolet',
    'Honda',
    'Volkswagen',
    'Hyundai',
    'Nissan',
    'Renault',
    'Fiat',
    'Jeep',
    'Audi',
  ];

  // Aplica os filtros aos veículos
  const filteredVeiculos = veiculos.filter((veiculo) => {
    return (
      (placaFilter === '' || veiculo.placa.includes(placaFilter)) &&
      (marcaFilter === '' || veiculo.marca === marcaFilter) &&
      (propositoFilter === '' || veiculo.proposito === propositoFilter)
    );
  });

  const handleDeleteVeiculo = (veiculo: Veiculo) => {
    setVeiculoToDelete(veiculo);
    setIsDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setVeiculoToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleSaveVeiculo = (veiculo: Veiculo) => {
    if (editingVeiculo) {
      const updatedVeiculos = veiculos.map((v) =>
        v.placa === editingVeiculo.placa ? veiculo : v,
      );
      setVeiculos(updatedVeiculos);
    } else {
      setVeiculos([...veiculos, veiculo]);
    }
    setIsFormVisible(false);
    setEditingVeiculo(null);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingVeiculo(null);
  };

  return (
    <div className={styles.container}>
      {!isFormVisible && (
        <div className={styles.header}>
          <Button
            label="Cadastrar veículo"
            onClick={() => setIsFormVisible(true)}
            className={styles.button}
          />
          <div className={styles.filters}>
            <form>
              <input
                type="text"
                value={placaFilter}
                onChange={(e) => setPlacaFilter(e.target.value)}
                placeholder="Filtrar por placa"
              />
              <select
                value={marcaFilter}
                onChange={(e) => setMarcaFilter(e.target.value)}
              >
                <option value="">Marca</option>
                {marcas.map((marca, index) => (
                  <option key={index} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
              <select
                value={propositoFilter}
                onChange={(e) => setPropositoFilter(e.target.value)}
              >
                <option value="">Propósito de uso</option>
                {propositos.map((proposito, index) => (
                  <option key={index} value={proposito}>
                    {proposito}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      )}

      {isFormVisible && (
        <FormVeiculo
          veiculo={editingVeiculo}
          onSave={handleSaveVeiculo}
          onCancel={handleCancelForm}
        />
      )}

      <VeiculosTable
        veiculos={filteredVeiculos}
        onEdit={setEditingVeiculo}
        onDelete={handleDeleteVeiculo}
      />

      {isDeleteModalVisible && (
        <DeleteModal
          veiculo={veiculoToDelete}
          onConfirm={() => {
            setVeiculos(
              veiculos.filter((v) => v.placa !== veiculoToDelete?.placa),
            );
            setIsDeleteModalVisible(false);
          }}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Veiculos;
