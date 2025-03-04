import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bienvenue sur MonBlog
        </h1>
        <p className="text-lg text-gray-700">
          Un endroit pour partager vos pensées et vos idées.
        </p>
      </main>
    </div>
  );
}

export default App;
