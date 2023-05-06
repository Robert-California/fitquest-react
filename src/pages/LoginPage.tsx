import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onSignOut: () => void;
 // name: (user: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
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
