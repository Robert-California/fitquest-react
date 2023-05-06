import React, { useState } from 'react';

interface NoteListProps {
  notes: { exercise: string; weight: number; reps: number; date: Date }[];
  onDelete: (note: { exercise: string; weight: number; reps: number; date: Date }) => Promise<void>;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const [selectedNote, setSelectedNote] = useState<{ exercise: string; weight: number; reps: number; date: Date } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleDeleteNote = (note: { exercise: string; weight: number; reps: number; date: Date }) => {
    setSelectedNote(note);
    onDelete(note);
  };

  const handleOpenModal = (note: { exercise: string; weight: number; reps: number; date: Date }) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul>
        {notes.map((note, index) => (
          <li className="bg-white w-48 hover:bg-blue-500 hover:text-gray-200 transition duration-200" key={index} onClick={() => handleOpenModal(note)}>
            {note.exercise}, {note.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
        
      <div className=''>

      {isModalOpen && selectedNote && (
        
        <div className='bg-cyan-400 rounded-lg py-2 font-medium text-black'>
        <p>
          Exercise: {selectedNote.exercise}
          <br />
          Date: {selectedNote.date.toLocaleDateString()}
          <br />
          Reps: {selectedNote.reps}
          <br />
          Weight: {selectedNote.weight}
        </p>
        <div className=' space-x-14'> 

        <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={(e) => {e.stopPropagation(); handleDeleteNote(selectedNote);}}>Delete</button>
        <button className='bg-red-500 rounded-lg py-2' onClick={handleCloseModal}>Close</button>
        </div>
      </div>
      )}
      </div>
      </div>
  );
};

export default NoteList;