import React from "react";
import { UserRound } from "lucide-react";

const Scoreboard = ({ 
  numberOfTeams, 
  playerPoints, 
  teamAPoints, 
  teamBPoints, 
  teamCPoints, 
  currentTeam 
}) => {
  if (numberOfTeams === 1) {
    return (
      <div className="flex flex-col items-center p-4 rounded-xl shadow-lg border-2 bg-violet-200 dark:bg-violet-700 border-violet-500 mb-8 w-full max-w-xl">
        <UserRound size={32} className="text-violet-500 mb-2" />
        <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400">Tu Puntuación</h2>
        <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{playerPoints}</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 w-full max-w-xl mb-8 ${numberOfTeams === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      <div className={`flex flex-col items-center p-4 rounded-xl shadow-lg border-2 ${currentTeam === 'A' ? 'bg-violet-200 dark:bg-violet-700 border-violet-500' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'}`}>
        <UserRound size={32} className="text-violet-500 mb-2" />
        <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400">Equipo A</h2>
        <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{teamAPoints}</p>
      </div>
      <div className={`flex flex-col items-center p-4 rounded-xl shadow-lg border-2 ${currentTeam === 'B' ? 'bg-violet-200 dark:bg-violet-700 border-violet-500' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'}`}>
        <UserRound size={32} className="text-violet-500 mb-2" />
        <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400">Equipo B</h2>
        <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{teamBPoints}</p>
      </div>
      {numberOfTeams === 3 && (
        <div className={`flex flex-col items-center p-4 rounded-xl shadow-lg border-2 ${currentTeam === 'C' ? 'bg-violet-200 dark:bg-violet-700 border-violet-500' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'}`}>
          <UserRound size={32} className="text-violet-500 mb-2" />
          <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400">Equipo C</h2>
          <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{teamCPoints}</p>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
