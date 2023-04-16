import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

// Definerer en React-komponent kaldet NotePage med typesikring
const NotePage: React.FC = () => {
    // Opretter en lokal tilstandsvariabel (notes) og en tilhørende opdateringsfunktion (setNotes)
    // til at holde styr på noterne, som er en liste af objekter med exercise, weight og reps
    const [notes, setNotes] = useState<
        { exercise: string; weight: number; reps: number; date: Date }[]
    >([]);

    // Definerer en funktion (addNote), der tager en note og tilføjer den til notes-tilstanden
    const addNote = (note: { exercise: string; weight: number; reps: number; date: Date }) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    // Returnerer JSX med en div, der indeholder NoteForm og NoteList komponenterne
    return (
        <div>
            {/* NoteForm komponenten modtager onSubmit som en prop og sætter den til addNote funktionen */}
            <NoteForm onSubmit={addNote} />
            {/* NoteList komponenten modtager notes som en prop */}
            <NoteList notes={notes} />
        </div>
    );
};

// Eksporterer NotePage som standard eksport
export default NotePage;
