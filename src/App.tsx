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
        element={user ? <Navigate to="/notepage" /> : <LoginPage onSignOut={handleSignOut} />}
      />
      <Route path="/notepage" element={<NotePage onSignOut={handleSignOut} />} />
    </Routes>
  );
}

export default App;

