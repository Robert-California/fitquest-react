// src/hooks/useAuth.ts

import { useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

const useAuth = (onUserChanged?: (user: User | null) => void) => {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (onUserChanged) {
        onUserChanged(firebaseUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, onUserChanged]);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return { user, signInWithGoogle, signOutUser };
};

export default useAuth;
