import React from "react";
import { Lock } from "lucide-react";

const StartScreen = ({ numberOfTeams, setNumberOfTeams, onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-inter">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-violet-500 flex items-center justify-center gap-2">
          <Lock size={36} /> Juego de Seguridad Digital
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Juega y aprende sobre cómo protegerte en la red.
        </p>

        {/* Selector de modo de juego */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Selecciona el modo de juego</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setNumberOfTeams(1)}
              className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
                numberOfTeams === 1 
                  ? 'bg-violet-500 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              1 Jugador
            </button>
            <button
              onClick={() => setNumberOfTeams(2)}
              className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
                numberOfTeams === 2 
                  ? 'bg-violet-500 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              2 Equipos
            </button>
            <button
              onClick={() => setNumberOfTeams(3)}
              className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
                numberOfTeams === 3 
                  ? 'bg-violet-500 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              3 Equipos
            </button>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
        >
          Comenzar Juego
        </button>
      </div>
    </div>
  );
};

export default StartScreen;