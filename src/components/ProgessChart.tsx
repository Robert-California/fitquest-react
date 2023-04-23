import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ProgressChartProps {
    data: { exercise: string; weight: number; reps: number; date: Date }[];
    selectedExercise: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, selectedExercise }) => {
    const filteredData = data.filter((item) => item.exercise === selectedExercise);

    return (
        <div>
            <h2>Progress Chart</h2>
            <LineChart width={600} height={300} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default ProgressChart;
