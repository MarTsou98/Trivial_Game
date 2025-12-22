// components/GameOver.tsx

/**
 * Displays the end-of-game screen with the player's score.
 * Shows a special message if the player achieved a perfect score.
 * Provides a button to restart the game.
 */
type GameOverProps = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function GameOver({ score, total, onRestart }: GameOverProps) {
  // Show a special "Perfect Score" message if all questions were answered correctly
  if (score / total === 1) 
    return (
      <div className="p-6 bg-green-100 rounded text-center space-y-4">
        <h2 className="text-3xl font-bold">Perfect Score! 🎉</h2>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Play Again
        </button>
      </div>
    );

  // Default end-of-game screen showing score and success rate
  return (
    <div className="p-6 bg-green-100 rounded text-center space-y-4">
      <h2 className="text-3xl font-bold">Game Over 🎉</h2>
      <p className="text-xl">
        Your Score: <strong>{score}</strong> / {total}
      </p>
      <p>{(score / total) * 100}% Success Rate</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Again
      </button>
    </div>
  );
}
