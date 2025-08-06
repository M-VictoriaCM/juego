import React from "react";

const StealControls = ({ 
  numberOfTeams, 
  currentPhase, 
  currentTeam, 
  stealingTeam, 
  onStealingTeamSelect 
}) => {
  if (numberOfTeams === 1 || currentPhase !== 'steal' || stealingTeam) {
    return null;
  }

  const availableStealingTeams = ['A', 'B', 'C'].filter(team => 
    team !== currentTeam && 
    (numberOfTeams === 3 || (numberOfTeams === 2 && team !== 'C'))
  );

  if (availableStealingTeams.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold text-gray-700 dark:text-gray-300">¿Qué equipo roba el turno?</p>
        <div className="flex gap-4">
          {availableStealingTeams.map(team => (
            <button
              key={team}
              onClick={() => onStealingTeamSelect(team)}
              className="py-2 px-6 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              Equipo {team}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StealControls;