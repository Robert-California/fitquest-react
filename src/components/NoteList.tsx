import React, { useState } from 'react';

interface NoteListProps {
  notes: { exercise: string; weight: number; reps: number; date: Date }[];
  onDelete: (note: { exercise: string; weight: number; reps: number; date: Date }) => Promise<void>;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleDeleteNote = (note: { exercise: string; weight: number; reps: number; date: Date }) => {
    onDelete(note);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul>
        {notes.map((note, index) => (
          <li className="bg-white w-48" key={index} onClick={handleOpenModal}>
            {note.exercise}, {note.weight} kg, {note.reps} reps, {note.date.toLocaleDateString()}
            <button onClick={(e) => {e.stopPropagation(); handleDeleteNote(note);}}>Delete</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div>
          <div>Your modal content goes here.</div>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NoteList;
