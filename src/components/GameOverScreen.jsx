import React from "react";
import { Trophy, RefreshCcw, XCircle } from "lucide-react";

const GameOverScreen = ({ 
  numberOfTeams, 
  playerPoints, 
  teamAPoints, 
  teamBPoints, 
  teamCPoints, 
  onRestart 
}) => {
  const teams = [
    { name: 'A', points: teamAPoints }, 
    { name: 'B', points: teamBPoints }
  ];
  
  if (numberOfTeams === 3) {
    teams.push({ name: 'C', points: teamCPoints });
  }

  const findWinner = () => {
    if (numberOfTeams === 1) {
      return playerPoints > 0 ? 'Jugador' : null;
    }
    
    let maxPoints = -Infinity;
    let winners = [];
    
    teams.forEach(team => {
      if (team.points > maxPoints) {
        maxPoints = team.points;
        winners = [team.name];
      } else if (team.points === maxPoints) {
        winners.push(team.name);
      }
    });
    
    return winners.length > 1 ? 'Empate' : winners[0];
  };

  const finalWinner = findWinner();
  const isSoloPlayer = numberOfTeams === 1;
  const isGameOver = isSoloPlayer && playerPoints <= 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-inter">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
        
        {/* ÍCONO */}
        {isGameOver ? (
          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
        ) : (
          <Trophy size={64} className="text-yellow-500 mx-auto mb-4" />
        )}

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold text-violet-500 mb-2">
          {isGameOver ? 'Game Over' : '¡Juego Terminado!'}
        </h1>

        {/* MENSAJE */}
        {isSoloPlayer ? (
          <p className="text-2xl font-semibold mb-4">
            {isGameOver
              ? 'No obtuviste puntos. ¡Intentá de nuevo!'
              : <>¡Tu puntuación final es: <span className="text-violet-600">{playerPoints}</span> pts!</>
            }
          </p>
        ) : (
          finalWinner === 'Empate' ? (
            <p className="text-2xl font-semibold mb-4">Ha habido un empate.</p>
          ) : (
            <p className="text-2xl font-semibold mb-4">¡El Equipo {finalWinner} ha ganado!</p>
          )
        )}
        
        {/* PUNTOS DE LOS EQUIPOS */}
        {numberOfTeams !== 1 && (
          <div className="flex justify-around mb-6 text-lg font-medium">
            {teams.map((team, index) => (
              <p key={index}>
                Equipo {team.name}: <span className="text-2xl font-bold text-violet-600">{team.points}</span> pts
              </p>
            ))}
          </div>
        )}

        {/* REFLEXIÓN */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          "¿Qué fue lo más difícil de decidir?", "¿Aprendimos algo nuevo sobre cómo cuidarnos online?"
        </p>

        {/* BOTÓN DE REINICIAR */}
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
        >
          <RefreshCcw size={20} />
          Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
