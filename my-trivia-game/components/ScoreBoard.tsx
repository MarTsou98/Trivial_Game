/**
 * Displays the player's current score relative to the total number of questions.
 */
interface Props {
  score: number;
  total: number;
}

export default function ScoreBoard({ score, total }: Props) {
  return (
    <div className="p-2 bg-gray-200 rounded">
      Score: {score} / {total}
    </div>
  );
}
