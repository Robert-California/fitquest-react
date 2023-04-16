// NoteList.tsx
import React from "react";

interface NoteListProps {
    notes: { exercise: string; weight: number; reps: number; date: Date }[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
    return (
        <ul>
            {notes.map((note, index) => (
                <li className="bg-white" key={index}>
                    {note.exercise}, {note.weight} kg, {note.reps} reps, {note.date.toLocaleDateString()}
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
