import React from "react";
import { Sparkles } from "lucide-react";

const GameControls = ({ 
  currentPhase, 
  onNextTurn, 
  onExplain 
}) => {
  if (currentPhase !== 'resolved') {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <button
        onClick={onNextTurn}
        className="w-full md:w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
      >
        Siguiente Ronda
      </button>
      <button
        onClick={onExplain}
        className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
      >
        <Sparkles size={20} />
        Explicar Respuesta
      </button>
    </div>
  );
};

export default GameControls;