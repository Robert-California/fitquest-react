import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Definerer props-objektet som bliver sendt ind til NoteForm-komponenten
interface NoteFormProps {
    onSubmit: (note: { exercise: string; weight: number; reps: number; date: Date }) => void;
}

// React-komponenten NoteForm tager imod props-objektet onSubmit
const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {

    // useState-hooks til at håndtere værdierne i form-felterne
    const [exercise, setExercise] = useState<string>("");
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [date, setDate] = useState<Date | null>(null);

    // Funktion, der håndterer indsendelse af formularen, når submit-knappen trykkes på
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Forhindrer standard opførsel
        const currentDate = new Date();
        const selectedDate = date || currentDate;
        onSubmit({ exercise, weight, reps, date: selectedDate }); // Kalder onSubmit-prop'en(addNote) med nuværende værdi for exercise, weight og reps
    };

    // Funktion, der opdaterer nuværende værdi for en input-værdi, når den ændres
    const handleChange = (event: any, setStateFunc: (value: any) => void) => {
        setStateFunc(event.target.value); // Opdaterer state-værdien med den nye værdi fra input-feltet
    }

    // Funktion, der håndterer ændringer i dropdown-menuen
    const handleSelectChange = (event: any) => {
        setExercise(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} >
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
                onChange={(event) => handleChange(event, setWeight)} // Kalder handleChange med event-objektet og funktionen til at opdatere state-værdien
            />
            <input
                type="text"
                value={reps}
                placeholder="Reps"
                onChange={(event) => handleChange(event, setReps)}
            />
            <div>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Vælg dato"
                />
            </div>
            <button className="bg-blue-700" type="submit">Tilføj</button>
        </form>
    );
}

// Eksporterer NoteForm-komponenten som standard eksport
export default NoteForm;
