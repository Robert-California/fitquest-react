// NotePage.tsx
import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const NotePage: React.FC = () => {
    const [notes, setNotes] = useState<
        { exercise: string; weight: number; reps: number }[]
    >([]);

    const addNote = (note: { exercise: string; weight: number; reps: number }) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    return (
        <div>
            <NoteForm onSubmit={addNote} />
            <NoteList notes={notes} />
        </div>
    );
};

export default NotePage;
