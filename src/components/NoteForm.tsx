import React, { useState } from "react";

interface NoteFormProps {
    onSubmit: (note: { exercise: string; weight: number; reps: number }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
    const [exercise, setExercise] = useState<string>("");
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);



    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit({ exercise, weight, reps });
    };

    const handleChange = (event: any, setStateFunc: (value: any) => void) => {
        setStateFunc(event.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={exercise}
                placeholder="Øvelse"
                onChange={(event) => handleChange(event, setExercise)}
            />
            <input
                type="text"
                value={weight}
                placeholder="Vægt i KG"
                onChange={(event) => handleChange(event, setWeight)}
            />
            <input
                type="text"
                value={reps}
                placeholder="Reps"
                onChange={(event) => handleChange(event, setReps)}
            />
            <button type="submit">Tilføj</button>
        </form>
    );
}

export default NoteForm;