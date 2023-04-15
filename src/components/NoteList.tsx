// NoteList.tsx
import React from "react";

interface NoteListProps {
    notes: { exercise: string; weight: number; reps: number }[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
    return (
        <ul>
            {notes.map((note, index) => (
                <li key={index}>
                    {note.exercise}, {note.weight} kg, {note.reps} reps
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
