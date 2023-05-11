import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { collection, query, where, getDocs, deleteDoc, DocumentReference, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import ProgressChart from '../components/ProgessChart';
import firestore from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NotePageProps {
  onSignOut: () => void;
  displayName: string | null;
  uid: string | null;
}

const NotePage: React.FC<NotePageProps> = ({ onSignOut, displayName, uid }) => {
  const [notes, setNotes] = useState<
    { exercise: string; weight: number; reps: number; date: Date }[]
  >([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const notesCollection = collection(firestore, 'notes');

  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      const userNotesQuery = query(
        collection(firestore, 'notes'),
        where('userId', '==', uid),
        orderBy('date')
      );
  
      const unsubscribe = onSnapshot(userNotesQuery, (snapshot) => {
        const newNotes: { exercise: string; weight: number; reps: number; date: Date }[] = [];
        snapshot.forEach((doc) => {
          const noteData = doc.data();
          newNotes.push({
            exercise: noteData.exercise,
            weight: noteData.weight,
            reps: noteData.reps,
            date: noteData.date.toDate(),
          });
        });
        setNotes(newNotes);
      });
    
  
      return () => {
        
        unsubscribe();
      };
    }
  }, [uid]);
  

  const signOut = async () => {
    await signOutUser();
    navigate('/');
  };

  const addNote = async (note: {
    exercise: string;
    weight: number;
    reps: number;
    date: Date;
  }) => {
    await addDoc(notesCollection, { ...note, userId: uid });
  };

  const deleteNote = async (note: {
    exercise: string;
    weight: number;
    reps: number;
    date: Date;
  }) => {
    const noteQuery = query(
      notesCollection,
      where('exercise', '==', note.exercise),
      where('weight', '==', note.weight),
      where('reps', '==', note.reps),
      where('date', '==', note.date),
      where('userId', '==', uid)
    );

    const querySnapshot = await getDocs(noteQuery);
    if (querySnapshot.size > 0) {
      const noteDocRef = querySnapshot.docs[0].ref;
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
          {notes.length > 0 ? (
              <ProgressChart data={notes} selectedExercise={selectedExercise} />
              ) : (
                <p>No notes available.</p>
              )}
            </div>
            <div className="max-w-lg mx-auto flex flex-row items-start space-x-4 py-6 p-6 p-4">
              <div className="rounded-lg shadow-lg border-2 border-gray-300 p-4">
                <NoteForm onSubmit={addNote} onExerciseChange={setSelectedExercise} />
              </div>
              <div className="ml-4 rounded-lg shadow-lg border-2 border-gray-300 p-4">
                {notes.length > 0 ? (
                  <NoteList notes={notes} onDelete={deleteNote} />
                ) : (
                  <p>No notes available.</p>
                )}
              </div>
            </div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </div>
      );
    };
    
    export default NotePage;