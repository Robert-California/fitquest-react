import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';



const LoginPage: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/notepage');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };


  return (
    <div>
        <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
