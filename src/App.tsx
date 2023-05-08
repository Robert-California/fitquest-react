import React from 'react';
import NotePage from './pages/NotePage';
import LoginPage from './pages/LoginPage';
import useAuth from './hooks/useAuth';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const { user, signOutUser } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/notepage" /> : <Navigate to="/loginpage" />}
      />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/notepage" element={<NotePage onSignOut={handleSignOut} displayName={user?.displayName || null}/>} />
    </Routes>
  );
}

export default App;

