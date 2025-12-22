import { TriviaQuestion } from '../types/trivia';

/**
 * Renders a single trivia question and its possible answer options.
 * Invokes the provided callback when an answer is selected.
 */
interface Props {
  question: TriviaQuestion;
  onAnswer: (answer: string) => void;
}

export default function QuestionCard({ question, onAnswer }: Props) {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold mb-2">{question.question}</h3>
      <div className="flex flex-col space-y-2">
        {question.options?.map((option) => (
          <button
            key={option}
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
