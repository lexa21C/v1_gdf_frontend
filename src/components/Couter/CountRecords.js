import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountRecords = () => {
    const [records, setRecords] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [animatedCount, setAnimationCount] = useState(0);

    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await axios.get('api/v1/records');
                const data = response.data.results;
                setRecords(data);
                setResultCount(data.length);
            } catch (error) {
                console.warn(error);
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
                {records.map((record, index) => (
                    <li key={record.id}>{record.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default CountRecords;
