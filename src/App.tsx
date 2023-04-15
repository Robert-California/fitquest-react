import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from "react-router-dom";
import NotePage from './pages/NotePage';
function App() {


  return (
    <>
      <div>
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/notepage" element={<NotePage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
