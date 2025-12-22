'use client';

import { useState } from 'react';
import { getQuestions } from '../services/trivia.service';
import { TriviaQuestion } from '../types/trivia';
import QuestionCard from '../components/QuestionCard';
import ScoreBoard from '../components/ScoreBoard';
import MainMenu from '../components/MainMenu';
import GameSettings from '../components/GameSettings';
import { GameSettingsDto } from '../types/gameSettings';
import { htmlDecode } from '../utils/htmlDecode';
import GameOver from '../components/GameOver';

export default function Home() {
  // UI state for showing main menu and game settings
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [gameSettings, setGameSettings] = useState<GameSettingsDto | null>(null);

  // Game state
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  // Resets the game state to allow restarting
  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setQuestions([]);
    setGameSettings(null);
    setShowMainMenu(true);
  };

  // Called when clicking "Start Game" on MainMenu
  const handleShowSettings = () => {
    setShowMainMenu(false);
  };

  // Called when GameSettings form is submitted
  const handleStartGame = async (settings: GameSettingsDto) => {
    setGameSettings(settings);

    // Fetch questions from backend and decode HTML entities
    const data = await getQuestions(
      settings.amount,
      settings.category,
      settings.difficulty,
      settings.type
    );

    const withOptions = data.map(q => ({
      ...q,
      question: htmlDecode(q.question),
      correct_answer: htmlDecode(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(htmlDecode),
      options:
        q.type === 'multiple'
          ? [...q.incorrect_answers.map(htmlDecode), htmlDecode(q.correct_answer)].sort(
              () => Math.random() - 0.5
            )
          : ['True', 'False'],
    }));

    setQuestions(withOptions);
  };

  // Handles when a player selects an answer
  const handleAnswer = (answer: string) => {
    if (answer === questions[current].correct_answer) setScore(s => s + 1);
    setCurrent(c => c + 1);
  };

  // 1️⃣ Show main menu first
  if (showMainMenu) return <MainMenu onStart={handleShowSettings} />;

  // 2️⃣ Show game settings if main menu is passed but game not started
  if (!gameSettings) return <GameSettings onStart={handleStartGame} />;

  // 3️⃣ Show loading state while fetching questions
  if (questions.length === 0) return <p>Loading questions...</p>;

  // 4️⃣ Show game over screen if all questions are answered
  if (current >= questions.length) {
    return (
      <main className="p-8">
        <GameOver score={score} total={questions.length} onRestart={restartGame} />
      </main>
    );
  }

  // 5️⃣ Show current question
  return (
    <main className="p-8 space-y-4">
      <QuestionCard question={questions[current]} onAnswer={handleAnswer} />
    </main>
  );
}
