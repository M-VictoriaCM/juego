import { useState } from "react";
import {cards} from "../data/gameData"

export const useGameLogic = () => {
  // Estados del juego
  const [playerPoints, setPlayerPoints] = useState(0);
  const [teamAPoints, setTeamAPoints] = useState(0);
  const [teamBPoints, setTeamBPoints] = useState(0);
  const [teamCPoints, setTeamCPoints] = useState(0);
  const [numberOfTeams, setNumberOfTeams] = useState(1);
  const [currentTeam, setCurrentTeam] = useState('A');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Estados para la mecánica de robo
  const [currentPhase, setCurrentPhase] = useState('normal');
  const [stealingTeam, setStealingTeam] = useState(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [teamsWithStealChance, setTeamsWithStealChance] = useState([]);

  // Función para manejar la selección de una opción
  const handleOptionClick = (option) => {
    if (currentPhase === 'resolved' && numberOfTeams !== 1) return;
    if (selectedOption && numberOfTeams !== 1 && currentPhase !== 'steal') return;

    setSelectedOption(option);
    const isCorrect = option.points > 0;
    setLastAnswerCorrect(isCorrect);

    if (numberOfTeams === 1) {
      setPlayerPoints(playerPoints + option.points);
      setCurrentPhase('resolved');
    } else {
      if (currentPhase === 'normal') {
        if (isCorrect) {
          if (currentTeam === 'A') setTeamAPoints(teamAPoints + option.points);
          else if (currentTeam === 'B') setTeamBPoints(teamBPoints + option.points);
          else if (currentTeam === 'C') setTeamCPoints(teamCPoints + option.points);
          setCurrentPhase('resolved');
        } else {
          setCurrentPhase('steal');
          const teamsArray = numberOfTeams === 2 ? ['A', 'B'] : ['A', 'B', 'C'];
          const remainingTeams = teamsArray.filter(team => team !== currentTeam);
          setTeamsWithStealChance(remainingTeams);
          setSelectedOption(null);
        }
      } else if (currentPhase === 'steal') {
        if (isCorrect) {
          const points = Math.ceil(option.points / 2);
          if (stealingTeam === 'A') setTeamAPoints(teamAPoints + points);
          else if (stealingTeam === 'B') setTeamBPoints(teamBPoints + points);
          else if (stealingTeam === 'C') setTeamCPoints(teamCPoints + points);
          setCurrentPhase('resolved');
        } else {
          const updatedStealChance = teamsWithStealChance.filter(team => team !== stealingTeam);
          setTeamsWithStealChance(updatedStealChance);
          setStealingTeam(null);
          setSelectedOption(null);
          if (updatedStealChance.length === 0) {
            setCurrentPhase('resolved');
          }
        }
      }
    }
  };

  // Función para pasar al siguiente turno
  const nextTurn = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);

      if (numberOfTeams !== 1) {
        const teamsArray = numberOfTeams === 2 ? ['A', 'B'] : ['A', 'B', 'C'];
        const currentIndex = teamsArray.indexOf(currentTeam);
        const nextIndex = (currentIndex + 1) % teamsArray.length;
        setCurrentTeam(teamsArray[nextIndex]);
      }
      
      setSelectedOption(null);
      setCurrentPhase('normal');
      setStealingTeam(null);
      setLastAnswerCorrect(null);
      setTeamsWithStealChance([]);
    } else {
      setIsGameOver(true);
    }
  };

  // Función para reiniciar el juego
  const restartGame = () => {
    setPlayerPoints(0);
    setTeamAPoints(0);
    setTeamBPoints(0);
    setTeamCPoints(0);
    setCurrentTeam('A');
    setCurrentCardIndex(0);
    setSelectedOption(null);
    setIsGameStarted(false);
    setIsGameOver(false);
    setNumberOfTeams(1);
    setCurrentPhase('normal');
    setStealingTeam(null);
    setLastAnswerCorrect(null);
    setTeamsWithStealChance([]);
  };

  const startGame = () => {
    setIsGameStarted(true);
  };

  const selectStealingTeam = (team) => {
    setStealingTeam(team);
  };

  return {
    // Estados
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
    teamsWithStealChance,
    
    // Funciones
    setNumberOfTeams,
    handleOptionClick,
    nextTurn,
    restartGame,
    startGame,
    selectStealingTeam
  };
};