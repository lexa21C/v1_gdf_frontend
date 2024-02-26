import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountCompetence = () => {
  const [competences, setCompetences] = useState([]);
  const [competenceCount, setCompetenceCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const response = await axios.get('/api/v1/competences');
        const data = response.data.results;
        setCompetences(data);
        setCompetenceCount(data.length);
      } catch (error) {
        // console.log(error);
        console.warn(error);
      }
    };

    fetchCompetences();
  }, []);

  useEffect(() => {
    const animationDuration = 2000; // Duración de la animación en milisegundos
    const stepValue = Math.ceil(competenceCount / (animationDuration / 100)); // Valor de incremento por paso
    let currentCount = 0;

    const counterInterval = setInterval(() => {
      currentCount += stepValue;
      if (currentCount >= competenceCount) {
        currentCount = competenceCount;
        clearInterval(counterInterval);
      }
      setAnimatedCount(currentCount);
    }, 100);

    return () => {
      clearInterval(counterInterval);
    };
  }, [competenceCount]);

  return (
    <div>
      <h2>{animatedCount}</h2>
      <ul>
        {competences.map((competence, index) => (
          <li key={competence.id}>{competence.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountCompetence;
