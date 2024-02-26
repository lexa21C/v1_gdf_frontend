import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountProjects = () => {
    const [projects, setProjects] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [animatedCount, setAnimationCount] = useState(0);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get('api/v1/projects');
                const data = response.data.results;
                setProjects(data);
                setResultCount(Array.isArray(data) ? data.length : 0);
            } catch (error) {
                console.warn(error);
            }
        };

        getProjects();
    }, []);

    useEffect(() => {
        const animationDuration = 4000; // Duración de la animación en milisegundos
        const stepValue = Math.ceil(resultCount / (animationDuration / 100)); // Valor de incremento por paso
        let currentCount = 0;

        const counterInterval = setInterval(() => {
            currentCount += stepValue;
            if (currentCount >= resultCount) {
                currentCount = resultCount;
                clearInterval(counterInterval);
            }

            setAnimationCount(currentCount);
        }, 100);

        return () => {
            clearInterval(counterInterval);
        };
    }, [resultCount]);

    return (
        <div>
            <h2>{animatedCount}</h2>
            <ul>
                {projects && projects.map((project, index) => (
                    <li key={project.id}>{project.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default CountProjects;
