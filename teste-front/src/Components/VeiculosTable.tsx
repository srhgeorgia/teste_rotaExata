import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Rating, // Importando o Rating do Material UI
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Ícone dos três pontinhos
import styles from '../styles/Veiculos.module.css';
import { Veiculo } from '../interfaces/Veiculo';

interface VeiculosTableProps {
  veiculos: Veiculo[];
  onEdit: (veiculo: Veiculo) => void;
  onDelete: (veiculo: Veiculo) => void;
}

const VeiculosTable = ({ veiculos, onEdit, onDelete }: VeiculosTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);

  // Abre o menu de ações
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    veiculo: Veiculo,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedVeiculo(veiculo);
  };

  // Fecha o menu de ações
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVeiculo(null);
  };

  const handleEdit = () => {
    if (selectedVeiculo) {
      onEdit(selectedVeiculo);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (selectedVeiculo) {
      onDelete(selectedVeiculo);
    }
    handleClose();
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#007DF0' }}>Placa</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>Marca/Modelo</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>Ano</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>Cor</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>Propósito de uso</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>Zero-quilômetro?</TableCell>
            <TableCell sx={{ color: '#007DF0' }}>
              Nível de conforto
            </TableCell>{' '}
            {/* Alterado para incluir Rating */}
            <TableCell sx={{ color: '#007DF0' }}>
              Local de repouso (lat, long)
            </TableCell>
            <TableCell sx={{ color: '#007DF0' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {veiculos.map((veiculo, index) => (
            <TableRow key={index}>
              <TableCell>{veiculo.placa}</TableCell>
              <TableCell>
                {veiculo.marca} {veiculo.modelo}
              </TableCell>
              <TableCell>{veiculo.ano}</TableCell>
              <TableCell>{veiculo.cor}</TableCell>
              <TableCell>{veiculo.proposito}</TableCell>
              <TableCell>{veiculo.zeroQuilometro ? 'Sim' : 'Não'}</TableCell>
              <TableCell>
                <Rating
                  name={`comfort-rating-${index}`}
                  value={veiculo.conforto} // Valor de 0 a 5 (estrela)
                  precision={0.5} // Precision para mostrar meia estrela
                  readOnly
                />
              </TableCell>
              <TableCell>{String(veiculo.localRepouso)}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleClick(event, veiculo)}>
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleEdit}>Editar</MenuItem>
                  <MenuItem onClick={handleDelete}>Deletar</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VeiculosTable;
