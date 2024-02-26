
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounThematics = () => {
    const [lines, setLines] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [animatedCount, setAnimationCount] = useState(0);

    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await axios.get('api/v1/thematics');
                const data = response.data.results;
                setLines(data);
                setResultCount(data.length);
            } catch (error) {
                // console.log(error);
                console.warn(error)
            }
        };

        getRecords();
    }, []);

    useEffect(() => {
        const animationDuration = 4000; // Duration of the animation in milliseconds
        const stepValue = Math.ceil(resultCount / (animationDuration / 100)); // Increment value per step
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
                {lines.map((line, index) => (
                    <li key={line.id}>{line.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default CounThematics;
