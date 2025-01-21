import { useEffect, useState } from 'react';

const Historico = () => {
  const [historico, setHistorico] = useState<string[]>([]);

  useEffect(() => {
    const storedHistorico = JSON.parse(
      localStorage.getItem('historico') || '[]',
    );
    setHistorico(storedHistorico);
  }, []);

  return (
    <div>
      <h2>Histórico de Ações</h2>
      <ul>
        {historico.map((evento, index) => (
          <li key={index}>{evento}</li>
        ))}
      </ul>
    </div>
  );
};

export default Historico;
