import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styles from '../styles/FormVeiculo.module.css';
import stylesPop from '../styles/ErrorPopUp.module.css';
import { Veiculo } from '../interfaces/Veiculo';

interface FormVeiculoProps {
  veiculo: Veiculo | null;
  onSave: (veiculo: Veiculo) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const FormVeiculo = ({
  veiculo,
  onSave,
  onCancel,
  isEditing,
}: FormVeiculoProps) => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [proposito, setProposito] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nivelConforto, setNivelConforto] = useState(0);
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

  const resetForm = () => {
    setPlaca('');
    setModelo('');
    setAno('');
    setMarca('');
    setCor('');
    setProposito('');
    setLatitude('');
    setLongitude('');
    setNivelConforto(0);
    setZeroQuilometro(false);
    setError(null);
  };

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
      setNivelConforto(veiculo.nivelConforto);
      setZeroQuilometro(!!veiculo.zeroQuilometro || false);
    } else {
      resetForm();
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
    });

    resetForm();
  };

  const handleStarClick = (index: number) => {
    setNivelConforto((prevNivel) => (prevNivel === index + 1 ? 0 : index + 1));
  };

  const handleZeroQuilometroChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setZeroQuilometro(event.target.checked);
  };

  return (
    <div className={styles.formContainer}>
      <span className={styles.headerForms}>
        {isEditing ? 'Edição de veículo' : 'Cadastro de veículo'}
        <IconButton onClick={onCancel} style={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </span>
      <div className={styles.formContent}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placa"
                value={placa}
                onChange={(e) => !isEditing && setPlaca(e.target.value)}
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  select
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  select
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  label="Ano"
                  required
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                >
                  {[...Array(50)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cor"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  select
                  value={proposito}
                  onChange={(e) => setProposito(e.target.value)}
                  label="Propósito de uso"
                  required
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                >
                  {propositos.map((proposito, index) => (
                    <MenuItem key={index} value={proposito}>
                      {proposito}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <div className={styles.latLong}>
              <p>Local de repouso do veículo</p>
              <div className={styles.latLongFields}>
                <TextField
                  fullWidth
                  type="number"
                  label="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.starsContainer}>
                <p>Nível de conforto do veículo </p>
                {niveisConforto.map((index) => (
                  <IconButton
                    key={index}
                    onClick={() => handleStarClick(index)}
                    color={nivelConforto > index ? 'primary' : 'default'}
                    style={{ fontSize: '2rem' }}
                  >
                    {nivelConforto > index ? (
                      <StarIcon style={{ fontSize: '2rem' }} />
                    ) : (
                      <StarBorderIcon style={{ fontSize: '2rem' }} />
                    )}
                  </IconButton>
                ))}
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={zeroQuilometro}
                    onChange={handleZeroQuilometroChange}
                  />
                }
                label="Veículo zero-quilômetro?"
              />
            </div>
          </Grid>

          <div className={styles.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </form>

        {error && (
          <div className={stylesPop.errorPopup}>
            <div className={stylesPop.errorPopupContent}>
              <span
                className={stylesPop.errorPopupClose}
                onClick={() => setError(null)}
              >
                &times;
              </span>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormVeiculo;
