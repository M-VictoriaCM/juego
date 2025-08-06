import React from "react";

const GameCard = ({
  card,
  currentCardIndex,
  totalCards,
  numberOfTeams,
  currentTeam,
  currentPhase,
  stealingTeam,
  lastAnswerCorrect,
  selectedOption,
  onOptionClick
}) => {
  const renderPhaseMessage = () => {
    if (numberOfTeams === 1) {
      return <p className="text-center text-lg text-emerald-500 font-semibold mb-4">¡Tu Turno!</p>;
    }

    if (currentPhase === 'normal') {
      return <p className="text-center text-lg text-emerald-500 font-semibold mb-4">Turno del Equipo {currentTeam}</p>;
    }

    if (currentPhase === 'steal' && !stealingTeam) {
      return <p className="text-center text-lg text-red-500 font-semibold mb-4">¡Respuesta incorrecta! Ahora otro equipo puede robar.</p>;
    }

    if (currentPhase === 'steal' && stealingTeam) {
      return <p className="text-center text-lg text-blue-500 font-semibold mb-4">Turno para robar: Equipo {stealingTeam}</p>;
    }

    if (currentPhase === 'resolved' && lastAnswerCorrect !== null) {
      return (
        <div className={`text-center text-lg font-semibold mb-4 p-2 rounded-lg ${
          lastAnswerCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {lastAnswerCorrect ? (
            <span>¡Respuesta correcta!</span>
          ) : (
            <span>Respuesta incorrecta.</span>
          )}
        </div>
      );
    }

    return null;
  };

  const canClickOption = () => {
    if (numberOfTeams === 1) {
      return currentPhase !== 'resolved';
    }
    return currentPhase !== 'resolved' && (currentPhase === 'normal' || (currentPhase === 'steal' && stealingTeam));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-xl w-full">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Ronda {currentCardIndex + 1} de {totalCards}
      </p>
      <h3 className="text-xl font-bold mb-4">{card.question}</h3>
      
      {renderPhaseMessage()}

      {/* Opciones de respuesta */}
      <div className="space-y-4">
        {card.options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              if (canClickOption()) {
                onOptionClick(option);
              }
            }}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform
              ${selectedOption === option ?
                (option.points > 0 ? 'bg-green-200 dark:bg-green-700 border-green-500 shadow-md' : 'bg-red-200 dark:bg-red-700 border-red-500 shadow-md') :
                'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
              ${selectedOption === option ? 'border-2' : 'border border-gray-300 dark:border-gray-600'}
              ${!canClickOption() ? 'cursor-not-allowed opacity-75' : ''}
            `}
          >
            <p className="font-medium">
              {option.text}
            </p>
            {currentPhase === 'resolved' && (
              <p className={`text-sm mt-1 font-bold ${
                option.points > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                Puntos: {option.points}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCard;