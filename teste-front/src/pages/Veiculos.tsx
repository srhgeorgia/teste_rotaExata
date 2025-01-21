import { useState, useEffect } from 'react';
import { Button } from '../Components/Button';
import FormVeiculo from '../Components/FormVeiculo';
import VeiculosTable from '../Components/VeiculosTable';
import DeleteModal from '../Components/DeleteModal';
import styles from '../styles/Veiculos.module.css';
import { Veiculo } from '../interfaces/Veiculo';
import { TextField, MenuItem, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Details from '../Components/Details';

const Veiculos = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
  const [veiculoToDelete, setVeiculoToDelete] = useState<Veiculo | null>(null);
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);

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

  const filteredVeiculos = veiculos.filter((veiculo) => {
    if (isSearchClicked) {
      return (
        (placaFilter === '' || veiculo.placa.includes(placaFilter)) &&
        (marcaFilter === '' || veiculo.marca === marcaFilter) &&
        (propositoFilter === '' || veiculo.proposito === propositoFilter)
      );
    }
    return true;
  });

  useEffect(() => {
    const storedVeiculos = JSON.parse(localStorage.getItem('veiculos') || '[]');
    setVeiculos(storedVeiculos);
  }, []);

  const saveHistorico = (action: string, veiculo: Veiculo) => {
    const historico = JSON.parse(localStorage.getItem('historico') || '[]');
    const timestamp = new Date().toLocaleString();
    historico.push(`Veículo ${veiculo.placa} ${action} em ${timestamp}`);
    localStorage.setItem('historico', JSON.stringify(historico));
  };

  const saveVeiculoToLocalStorage = (veiculos: Veiculo[]) => {
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
  };

  const handleDeleteVeiculo = (veiculo: Veiculo) => {
    setVeiculoToDelete(veiculo);
    setIsDeleteModalVisible(true);
  };

  const handleEditVeiculo = (veiculo: Veiculo) => {
    setEditingVeiculo(veiculo);
    setIsFormVisible(true);
  };

  const handleDetail = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedVeiculo(null);
    setIsDetailsOpen(false);
  };

  const handleCancelDelete = () => {
    setVeiculoToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleSaveVeiculo = (veiculo: Veiculo) => {
    let updatedVeiculos = [...veiculos];

    if (editingVeiculo) {
      updatedVeiculos = veiculos.map((v) =>
        v.placa === editingVeiculo.placa ? veiculo : v,
      );
      saveHistorico('EDITADO', veiculo);
    } else {
      updatedVeiculos.push(veiculo);
      saveHistorico('CADASTRADO', veiculo);
    }

    setVeiculos(updatedVeiculos);
    saveVeiculoToLocalStorage(updatedVeiculos);

    setIsFormVisible(false);
    setEditingVeiculo(null);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingVeiculo(null);
  };

  return (
    <>
      {!isFormVisible && (
        <div className={styles.header}>
          <Button
            label="Cadastrar veículo"
            onClick={() => setIsFormVisible(true)}
            className={styles.button}
          />
          <div className={styles.filters}>
            <FormControl fullWidth required>
              <TextField
                select
                value={marcaFilter}
                onChange={(e) => setMarcaFilter(e.target.value)}
                label="Marca"
                size="small"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {marcas.map((marca, index) => (
                  <MenuItem key={index} value={marca}>
                    {marca}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl fullWidth required>
              <TextField
                label="Propósito de uso"
                select
                value={propositoFilter}
                onChange={(e) => setPropositoFilter(e.target.value)}
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Selecione o propósito de uso"
                fullWidth
              >
                {propositos.map((proposito, index) => (
                  <MenuItem key={index} value={proposito}>
                    {proposito}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <TextField
              fullWidth
              label="Placa"
              value={placaFilter}
              onChange={(e) => setPlacaFilter(e.target.value)}
              required
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div className={styles.filterButtons}>
              <IconButton
                onClick={() => setIsSearchClicked(true)}
                style={{ color: 'gray', width: '40px', height: '40px' }}
              >
                <SearchIcon data-testid="SearchIcon" />
              </IconButton>
              <div className={styles.separator}></div>
              <IconButton
                onClick={() => {
                  setMarcaFilter('');
                  setPropositoFilter('');
                  setPlacaFilter('');
                }}
                style={{ color: 'gray', width: '40px', height: '40px' }}
              >
                <DeleteIcon data-testid="DeleteIcon" />
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {isFormVisible && (
        <FormVeiculo
          veiculo={editingVeiculo}
          onSave={handleSaveVeiculo}
          onCancel={handleCancelForm}
          isEditing={!!editingVeiculo}
        />
      )}

      {selectedVeiculo && (
        <Details
          open={isDetailsOpen}
          onCancel={handleCloseDetails}
          veiculo={selectedVeiculo}
        />
      )}

      {!isFormVisible && (
        <VeiculosTable
          veiculos={filteredVeiculos}
          onEdit={handleEditVeiculo}
          onDelete={handleDeleteVeiculo}
          onDetail={handleDetail}
        />
      )}

      {isDeleteModalVisible && (
        <DeleteModal
          veiculo={veiculoToDelete}
          onConfirm={() => {
            setVeiculos(
              veiculos.filter((v) => v.placa !== veiculoToDelete?.placa),
            );
            saveHistorico('DELETADO', veiculoToDelete!);
            saveVeiculoToLocalStorage(
              veiculos.filter((v) => v.placa !== veiculoToDelete?.placa),
            );
            setIsDeleteModalVisible(false);
          }}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Veiculos;
