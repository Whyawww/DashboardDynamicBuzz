import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import InfluencerForm from "./components/InfluencerForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Header />
        <main className="flex flex-col items-center justify-start p-4">
          <Routes>
            <Route path="/" element={<InfluencerForm />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;