import { Modal, Box, Typography } from '@mui/material';
import { Veiculo } from '../interfaces/Veiculo';
import styles from '../styles/Details.module.css';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface DetailsProps {
  open: boolean;
  veiculo: Veiculo | null;
  onCancel: () => void;
}

const Details = ({ open, onCancel, veiculo }: DetailsProps) => {
  if (!veiculo) return null;

  const renderStars = (nivelConforto: number) => {
    return (
      <div className={styles.stars}>
        <span>{Math.max(nivelConforto - 1, 0)}</span>
        <StarIcon style={{ color: '#007DF0' }} />{' '}
      </div>
    );
  };

  const position: LatLngExpression = [
    parseFloat(veiculo.latitude),
    parseFloat(veiculo.longitude),
  ];

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1100,
          height: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <span className={styles.headerForms}>
          Detalhes do veículo
          <IconButton onClick={onCancel} style={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </span>

        <div className={styles.details}>
          <div className={styles.firstContainer}>
            <Typography className={styles.typography}>
              <div className={styles.placaContainer}>
                <div className={styles.imgVector}>
                  <img src="public/assets/Vector.png" alt="carro" />
                </div>
                <div className={styles.placaContent}>
                  <span className={styles.placa}>{veiculo.placa}</span>
                  <span className={styles.value}>Frota 101</span>
                </div>
              </div>
            </Typography>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Marca/Modelo</span>{' '}
                <span className={styles.value}>
                  {veiculo.marca} {veiculo.modelo}
                </span>
              </div>
            </Typography>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Ano</span>{' '}
                <span className={styles.value}>{veiculo.ano}</span>
              </div>
            </Typography>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Cor</span>{' '}
                <span className={styles.value}>{veiculo.cor}</span>
              </div>
            </Typography>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Propósito de uso</span>{' '}
                <span className={styles.value}>{veiculo.proposito}</span>
              </div>
            </Typography>
          </div>

          <div className={styles.secondContainer}>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Zero-quilômetro?</span>{' '}
                <span className={styles.value}>
                  {veiculo.zeroQuilometro ? 'Sim' : 'Não'}
                </span>
              </div>
            </Typography>
            <Typography className={styles.typography}>
              <div className={styles.valueContainer}>
                <span className={styles.title}>Nível de conforto</span>{' '}
                <span className={styles.valueStar}>
                  {renderStars(veiculo.nivelConforto)}
                </span>
              </div>
            </Typography>
          </div>
        </div>

        <Typography className={styles.typographyLoc}>
          <span className={styles.title}>Local de repouso (lat, long)</span>{' '}
          <span className={styles.valueLoc}>
            {veiculo.latitude}, {veiculo.longitude}
          </span>
        </Typography>
        <div className={styles.localizacao}>
          <MapContainer
            center={position}
            zoom={13}
            className={styles.mapContainer}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Local de repouso: {veiculo.latitude}, {veiculo.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Box>
    </Modal>
  );
};

export default Details;
