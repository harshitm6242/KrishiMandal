import React from 'react'
import { useState, useEffect } from 'react';

function Guidance() {
    const [guidance, setGuidance] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/cultivation-guides.json')
            .then(response => response.json())
            .then(data => setGuidance(data.guides))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="flex flex-col flex-wrap -mt-4">
            <h1 className="text-3xl font-bold underline underline-offset-2 ml-2">Cultivation Guides</h1>
            {guidance.map((guide, index) => (
                <div key={index} className="w-auto h-auto rounded-lg shadow-lg p-4 bg-white m-2">
                    <div className="font-bold text-xl mb-2">{guide.name}</div>
                    <p className="text-gray-700 text-base">
                        {guide.description}
                    </p>
                    <a href={guide.link} target="_blank" rel="noopener noreferrer">
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            More Details
                        </button>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Guidance;