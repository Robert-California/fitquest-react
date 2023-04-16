
import { Route, Routes } from "react-router-dom";
import NotePage from './pages/NotePage';
function App() {


  return (
    <>
      <div className="bg-gray-100 min-h-screen">
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
