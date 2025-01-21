import { ReactNode } from 'react';

export interface Veiculo {
  localRepouso: ReactNode;
  conforto: number | null | undefined;
  zeroQuilometro: unknown;
  nivelConforto: number;
  placa: string;
  modelo: string;
  ano: string;
  marca: string;
  cor: string;
  proposito: string;
  latitude: string;
  longitude: string;
}
