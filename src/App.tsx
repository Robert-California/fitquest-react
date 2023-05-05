
import { Route, Routes } from "react-router-dom";
import NotePage from './pages/NotePage';
function App() {


  return (
    <>
      <div>
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<NotePage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
