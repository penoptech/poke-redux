import { useAppSelector } from "../../app/hooks";
import { selectSelectedPokemon, selectLoadingStatus } from "./detailSlice";
import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { get } from "http";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
);

const radarChartConfig = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

function getStats(selectedPokemon: any) {
    if (!selectedPokemon) return { labels: [], data: [] };
    // Loop through the selectedPokemon.stats array and create a new array of labels and data
    // then return the labels and data as an object
    const labels: string[] = [];
    const data: number[] = [];
    selectedPokemon.stats.forEach((stat: any) => {
        labels.push(stat.stat.name);
        data.push(stat.base_stat);
    });
    return { labels, data };
}

const Detail = () => {
    const selectedPokemon = useAppSelector(selectSelectedPokemon);
    const loading = useAppSelector(selectLoadingStatus);

    const radarChartData = getStats(selectedPokemon);
    radarChartConfig.labels = radarChartData.labels;
    radarChartConfig.datasets[0].data = radarChartData.data;

    return (
        <div>
            {
                loading === 'loading' ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : selectedPokemon ?
                    (<div>
                        <h3>{selectedPokemon.name}</h3>
                        <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                        <ul>
                            {selectedPokemon.stats.map((stat: any) => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                        <Radar data={radarChartConfig} />
                    </div>

                    ) : null
            }
        </div>
    );
};

export default Detail;
