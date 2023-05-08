// src/NotePage.tsx

import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { collection, query, where, getDocs, deleteDoc, DocumentReference, Query, orderBy, DocumentData, QuerySnapshot, onSnapshot, addDoc } from 'firebase/firestore';
import ProgressChart from '../components/ProgessChart';
import firestore from '../firebase';
import useAuth from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

interface NotePageProps {
  onSignOut: () => void;
  displayName: string | null;
}

const NotePage: React.FC<NotePageProps> = ({ onSignOut, displayName }) => {
  console.log('NotePage is rendering'); // Add this line
  const [notes, setNotes] = useState<
    { exercise: string; weight: number; reps: number; date: Date }[]
  >([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const notesCollection = collection(firestore, 'notes');
  const notesQuery = query(notesCollection, orderBy('date'));
  const {signOutUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(notesQuery, (snapshot: QuerySnapshot) => {
      const newNotes = snapshot.docs.map((doc) => {
        const noteData = doc.data();
        return {
          exercise: noteData.exercise,
          weight: noteData.weight,
          reps: noteData.reps,
          date: noteData.date.toDate(),
        };
      });
      setNotes(newNotes);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () =>{
    await signOutUser();
    navigate("/")
  }

  const addNote = async (note: {
    exercise: string;
    weight: number;
    reps: number;
    date: Date;
  }) => {
    await addDoc(notesCollection, note);
  };

  const deleteNote = async (note: {
      exercise: string;
      weight: number;
      reps: number;
      date: Date;
    }) => {
      const noteQuery: Query<DocumentData> = query(
        notesCollection,
        where('exercise', '==', note.exercise),
        where('weight', '==', note.weight),
        where('reps', '==', note.reps),
        where('date', '==', note.date)
      );

      const querySnapshot = await getDocs(noteQuery);
      if (querySnapshot.size > 0) {
        const noteDocRef = querySnapshot.docs[0].ref as DocumentReference<DocumentData>;
        await deleteDoc(noteDocRef);
      } else {
        console.log('No matching document found.');
      }
    };

  return (
    <div>
      <div>
        Welcome {displayName}
      </div>
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center ml-4 py-6">
        <ProgressChart data={notes} selectedExercise={selectedExercise} />
      </div>
      <div className="max-w-lg mx-auto flex flex-row items-start space-x-4 py-6 p-4">
        <div className="rounded-lg shadow-lg border-2 border-gray-300 p-4">
          <NoteForm onSubmit={addNote} onExerciseChange={setSelectedExercise} />
        </div>
        <div className="ml-4 rounded-lg shadow-lg border-2 border-gray-300 p-4">
          <NoteList notes={notes} onDelete={deleteNote} />
        </div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
    </div>
  );
};

export default NotePage;
