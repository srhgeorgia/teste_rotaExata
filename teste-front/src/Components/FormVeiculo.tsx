import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styles from '../styles/Veiculos.module.css';
import { Veiculo } from '../interfaces/Veiculo';

interface FormVeiculoProps {
  veiculo: Veiculo | null;
  onSave: (veiculo: Veiculo) => void;
  onCancel: () => void;
}

const FormVeiculo = ({ veiculo, onSave, onCancel }: FormVeiculoProps) => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [proposito, setProposito] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nivelConforto, setNivelConforto] = useState(1);
  const [zeroQuilometro, setZeroQuilometro] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const niveisConforto = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (veiculo) {
      setPlaca(veiculo.placa);
      setModelo(veiculo.modelo);
      setAno(veiculo.ano);
      setMarca(veiculo.marca);
      setCor(veiculo.cor);
      setProposito(veiculo.proposito);
      setLatitude(veiculo.latitude);
      setLongitude(veiculo.longitude);
      setNivelConforto(veiculo.nivelConforto || 1);
      setZeroQuilometro(!!veiculo.zeroQuilometro || false);
    }
  }, [veiculo]);

  const handleSave = () => {
    if (
      !placa ||
      !modelo ||
      !ano ||
      !marca ||
      !cor ||
      !proposito ||
      !latitude ||
      !longitude
    ) {
      setError('Todos os campos são obrigatórios!');

      setTimeout(() => {
        setError(null);
      }, 1000);

      return;
    }

    onSave({
      placa,
      modelo,
      ano,
      marca,
      cor,
      proposito,
      latitude,
      longitude,
      nivelConforto,
      zeroQuilometro,
      localRepouso: undefined,
      conforto: undefined,
    });
  };

  const handleStarClick = (index: number) => {
    setNivelConforto(index + 1);
  };

  const handleZeroQuilometroChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setZeroQuilometro(event.target.checked);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Marca</InputLabel>
              <Select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                label="Marca"
              >
                {marcas.map((marca, index) => (
                  <MenuItem key={index} value={marca}>
                    {marca}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Ano</InputLabel>
              <Select
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                label="Ano"
              >
                {[...Array(50)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Propósito de uso</InputLabel>
              <Select
                value={proposito}
                onChange={(e) => setProposito(e.target.value)}
                label="Propósito de uso"
              >
                {propositos.map((proposito, index) => (
                  <MenuItem key={index} value={proposito}>
                    {proposito}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={styles.starsContainer}>
              <p>Nível de conforto do veículo</p>
              {niveisConforto.map((nivel, index) => (
                <IconButton
                  key={index}
                  onClick={() => handleStarClick(index)}
                  color={nivelConforto > index ? 'primary' : 'default'}
                >
                  {nivelConforto > index ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={zeroQuilometro}
                  onChange={handleZeroQuilometroChange}
                  color="primary"
                />
              }
              label="Zero quilômetro"
            />
          </Grid>
        </Grid>

        <div className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>

      {error && (
        <div className={styles.errorPopup}>
          <div className={styles.errorPopupContent}>
            <span
              className={styles.errorPopupClose}
              onClick={() => setError(null)}
            >
              &times;
            </span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormVeiculo;
