import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { collection, addDoc, onSnapshot, query, orderBy, QuerySnapshot } from "firebase/firestore";

import firestore from "../firebase";



// Definerer en React-komponent kaldet NotePage med typesikring
const NotePage: React.FC = () => {
    // Opretter en lokal tilstandsvariabel (notes) og en tilhørende opdateringsfunktion (setNotes)
    // til at holde styr på noterne, som er en liste af objekter med exercise, weight og reps
    const [notes, setNotes] = useState<
        { exercise: string; weight: number; reps: number; date: Date }[]
    >([]);

    useEffect(() => {
        const notesCollection = collection(firestore, "notes");
        const notesQuery = query(notesCollection, orderBy("date"));
        const unsubscribe = onSnapshot(notesQuery, (snapshot: QuerySnapshot) => {
            const newNotes = snapshot.docs.map((doc) => {
                const noteData = doc.data();
                return {
                    exercise: noteData.exercise,
                    weight: noteData.weight,
                    reps: noteData.reps,
                    date: noteData.date.toDate()
                };
            });
            setNotes(newNotes);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Definerer en funktion (addNote), der tager en note og tilføjer den til notes-tilstanden
    const addNote = async (note: { exercise: string; weight: number; reps: number; date: Date }) => {
        const notesCollection = collection(firestore, "notes");
        await addDoc(notesCollection, note);
    };

    // Returnerer JSX med en div, der indeholder NoteForm og NoteList komponenterne
    return (
        <div>
            {/* NoteForm komponenten modtager onSubmit som en prop og sætter den til addNote funktionen */}
            <NoteForm onSubmit={addNote} />
            {/* NoteList komponenten modtager notes som en prop */}
            <NoteList notes={notes} />
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    );
};


export default NotePage;
