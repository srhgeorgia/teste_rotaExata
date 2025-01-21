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
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';
import styles from '../styles/VeiculosTable.module.css';
import { Veiculo } from '../interfaces/Veiculo';

interface VeiculosTableProps {
  veiculos: Veiculo[];
  onEdit: (veiculo: Veiculo) => void;
  onDelete: (veiculo: Veiculo) => void;
  onDetail: (veiculo: Veiculo) => void;
}

const VeiculosTable = ({
  veiculos,
  onEdit,
  onDelete,
  onDetail,
}: VeiculosTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    veiculo: Veiculo,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedVeiculo(veiculo);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVeiculo(null);
  };

  const handleDelete = () => {
    if (selectedVeiculo) {
      onDelete(selectedVeiculo);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (selectedVeiculo) {
      onEdit(selectedVeiculo);
    }
    handleClose();
  };

  const handleDetail = () => {
    if (selectedVeiculo) {
      onDetail(selectedVeiculo);
    }
    handleClose();
  };

  const renderStars = (nivelConforto: number) => {
    return (
      <div className={styles.stars}>
        <span>{Math.max(nivelConforto - 1, 0)}</span>
        <StarIcon style={{ color: '#007DF0' }} />{' '}
      </div>
    );
  };

  const sortedVeiculos = [...veiculos].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.placa.localeCompare(b.placa);
    } else {
      return b.placa.localeCompare(a.placa);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={styles.tableWrapper}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                <span style={{ cursor: 'pointer' }} onClick={toggleSortOrder}>
                  {sortOrder === 'asc' ? '🔼' : '🔽'} Placa
                </span>
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Marca/Modelo
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Ano
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Cor
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Propósito de uso
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Zero-quilômetro?
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Nível de conforto
              </TableCell>
              <TableCell sx={{ color: '#007DF0', fontWeight: 'bold' }}>
                Local de repouso (lat, long)
              </TableCell>
              <TableCell
                sx={{ color: '#007DF0', fontWeight: 'bold' }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVeiculos.map((veiculo, index) => (
              <TableRow key={index}>
                <TableCell>{veiculo.placa}</TableCell>
                <TableCell>
                  {veiculo.marca} {veiculo.modelo}
                </TableCell>
                <TableCell>{veiculo.ano}</TableCell>
                <TableCell>{veiculo.cor}</TableCell>
                <TableCell>{veiculo.proposito}</TableCell>
                <TableCell>{veiculo.zeroQuilometro ? 'Sim' : 'Não'}</TableCell>
                <TableCell>{renderStars(veiculo.nivelConforto)}</TableCell>
                <TableCell>
                  {String(veiculo.latitude)}, {String(veiculo.longitude)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, veiculo)}>
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleDelete}>Deletar</MenuItem>
                    <MenuItem onClick={handleEdit}>Editar</MenuItem>
                    <MenuItem onClick={handleDetail}>Detalhar</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VeiculosTable;
