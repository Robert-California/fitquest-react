import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Definerer props-objektet som bliver sendt ind til NoteForm-komponenten
interface NoteFormProps {
    onSubmit: (note: { exercise: string; weight: number; reps: number; date: Date }) => void;
    onExerciseChange: (exercise: string) => void;
}


// React-komponenten NoteForm tager imod props-objektet onSubmit
const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onExerciseChange }) => {

    // useState-hooks til at håndtere værdierne i form-felterne
    const [exercise, setExercise] = useState<string>("");
    const [weight, setWeight] = useState<string | number>("");
    const [reps, setReps] = useState<string | number>("");
    const [date, setDate] = useState<Date | null>(null);
    const [number, setNumber] = useState<number>(0);

    // Funktion, der håndterer indsendelse af formularen, når submit-knappen trykkes på
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Forhindrer standard opførsel
        const currentDate = new Date();
        const selectedDate = date || currentDate;
        onSubmit({ exercise, weight: Number(weight), reps: Number(reps), date: selectedDate }); // Kalder onSubmit-prop'en(addNote) med nuværende værdi for exercise, weight og reps
        setExercise("");
        setWeight("");
        setReps("");
        setDate(null);
    };

    // Funktion, der håndterer ændringer i dropdown-menuen
    const handleSelectChange = (event: any) => {
        setExercise(event.target.value);
        onExerciseChange(event.target.value);
    };


    return (

        <form onSubmit={handleSubmit} className="flex flex-col w-48">
            <select name="exercise" onChange={handleSelectChange} value={exercise}>
                <option value="" disabled hidden>
                    Vælg øvelse
                </option>
                <option value="bænkpres">Bænkpres</option>
                <option value="dødløft">Dødløft</option>
                <option value="squat">Squat</option>
            </select>
            <input
                type="text"
                value={weight}
                placeholder="Vægt i KG"
                onChange={e => setWeight(e.target.value)} // Kalder handleChange med event-objektet og funktionen til at opdatere state-værdien
            />
            <input
                type="text"
                value={reps}
                placeholder="Reps"
                onChange={e => setReps(e.target.value)}
            />
            <div >
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Vælg dato"
                />
            </div>
            <button className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Tilføj</button>
        </form>
    );
}

// Eksporterer NoteForm-komponenten som standard eksport
export default NoteForm;
