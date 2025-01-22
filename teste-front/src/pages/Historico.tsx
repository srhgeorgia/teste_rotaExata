import { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TextField,
  IconButton,
  Pagination,
} from '@mui/material';
import styles from '../styles/Historico.module.css';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

interface HistoricoItem {
  texto: string;
  imagem: string;
}

const Historico = () => {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [placaFilter, setPlacaFilter] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const filteredHistorico = historico.filter((evento) => {
    if (isSearchClicked) {
      const placaNoTexto = evento.texto.match(/[A-Z]{3}-?[0-9]{4}/);
      if (placaNoTexto) {
        return placaNoTexto[0].includes(placaFilter.toUpperCase());
      }
      return false;
    }
    return true;
  });

  const paginatedHistorico = filteredHistorico.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    const storedHistorico = JSON.parse(
      localStorage.getItem('historico') || '[]',
    );
    setHistorico(storedHistorico.reverse());
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.header}>
          <div className={styles.filters}>
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
                  setPlacaFilter('');
                  setIsSearchClicked(false);
                }}
                style={{ color: 'gray', width: '40px', height: '40px' }}
              >
                <DeleteIcon data-testid="DeleteIcon" />
              </IconButton>
            </div>
          </div>
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <tbody>
              {paginatedHistorico.map((evento, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={evento.imagem} alt="Histórico" />
                  </TableCell>
                  <TableCell>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: evento.texto.replace(
                          /([A-Z0-9]{7})/,
                          (placa) =>
                            `<span class="placa-style">${placa}</span>`,
                        ),
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        count={Math.ceil(filteredHistorico.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className={styles.pagination}
      />
    </>
  );
};

export default Historico;
