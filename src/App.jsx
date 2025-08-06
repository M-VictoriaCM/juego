import React from "react";
import {cards} from "./data/gameData";
import { useGameLogic } from "./hooks/usegamelogic.js";
import {useExplanation} from "./hooks/useexplanation.js";
import StartScreen from "./components/StartScreen";
import Scoreboard from "./components/Scoreboard";
import GameCard from "./components/GameCard";
import StealControls from "./components/StealControls";
import GameControls from "./components/GameControls";
import ExplanationModal from "./components/ExplanationModal";
import GameOverScreen from "./components/GameOverScreen";

const App = () => {
  const gameLogic = useGameLogic();
  const explanation = useExplanation();

  const {
    playerPoints,
    teamAPoints,
    teamBPoints,
    teamCPoints,
    numberOfTeams,
    currentTeam,
    currentCardIndex,
    selectedOption,
    isGameStarted,
    isGameOver,
    currentPhase,
    stealingTeam,
    lastAnswerCorrect,
    setNumberOfTeams,
    handleOptionClick,
    nextTurn,
    restartGame,
    startGame,
    selectStealingTeam
  } = gameLogic;

  const handleNextTurn = () => {
    nextTurn();
    explanation.resetExplanation();
  };

  const handleExplain = () => {
    const currentCard = cards[currentCardIndex];
    explanation.fetchExplanation(currentCard);
  };

  const handleRestart = () => {
    restartGame();
    explanation.resetExplanation();
  };

  // Pantalla de prinicipal
  if (!isGameStarted) {
    return (
      <StartScreen 
        numberOfTeams={numberOfTeams}
        setNumberOfTeams={setNumberOfTeams}
        onStartGame={startGame}
      />
    );
  }

  // Pantalla de juego terminado
  if (isGameOver) {
    return (
      <GameOverScreen 
        numberOfTeams={numberOfTeams}
        playerPoints={playerPoints}
        teamAPoints={teamAPoints}
        teamBPoints={teamBPoints}
        teamCPoints={teamCPoints}
        onRestart={handleRestart}
      />
    );
  }

  // Pantalla principal del juego
  const currentCard = cards[currentCardIndex];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-inter">
      {/* Puntuación */}
      <Scoreboard 
        numberOfTeams={numberOfTeams}
        playerPoints={playerPoints}
        teamAPoints={teamAPoints}
        teamBPoints={teamBPoints}
        teamCPoints={teamCPoints}
        currentTeam={currentTeam}
      />

      {/* Tarjeta de pregunta */}
      <GameCard 
        card={currentCard}
        currentCardIndex={currentCardIndex}
        totalCards={cards.length}
        numberOfTeams={numberOfTeams}
        currentTeam={currentTeam}
        currentPhase={currentPhase}
        stealingTeam={stealingTeam}
        lastAnswerCorrect={lastAnswerCorrect}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
      />

      {/* Controles de robo */}
      <StealControls 
        numberOfTeams={numberOfTeams}
        currentPhase={currentPhase}
        currentTeam={currentTeam}
        stealingTeam={stealingTeam}
        onStealingTeamSelect={selectStealingTeam}
      />

      {/* Controles del juego */}
      <GameControls 
        currentPhase={currentPhase}
        onNextTurn={handleNextTurn}
        onExplain={handleExplain}
      />

      {/* Modal de explicación */}
      <ExplanationModal 
        isOpen={explanation.isExplanationModalOpen}
        isLoading={explanation.isLoadingExplanation}
        explanation={explanation.explanation}
        onClose={explanation.closeExplanationModal}
      />
    </div>
  );
};

export default App;