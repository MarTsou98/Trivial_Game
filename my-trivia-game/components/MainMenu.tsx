/**
 * Displays the main menu screen and allows the user to start the game.
 */
interface MainMenuProps {
  onStart: () => void;
}

export default function MainMenu({ onStart }: MainMenuProps) {
  return (
    <div className="p-4 bg-blue-200 rounded text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Trivia Game!</h1>
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={onStart} // Triggers game start in the parent component
      >
        Start Game
      </button>
    </div>
  );
}
