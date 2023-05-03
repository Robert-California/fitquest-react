import React from "react";

interface NoteListProps {
    notes: { exercise: string; weight: number; reps: number; date: Date }[];
    onDelete: (note: { exercise: string; weight: number; reps: number; date: Date }) => Promise<void>;
}


const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
    const handleDeleteNote = (note: { exercise: string; weight: number; reps: number; date: Date }) => {
        onDelete(note);
    };

    return (
        <ul>
            {notes.map((note, index) => (
                <li className="bg-white" key={index}>
                    {note.exercise}, {note.weight} kg, {note.reps} reps, {note.date.toLocaleDateString()}
                    <button onClick={() => handleDeleteNote(note)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
