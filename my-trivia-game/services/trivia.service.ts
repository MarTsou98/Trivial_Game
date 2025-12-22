import { TriviaQuestion } from '../types/trivia';

/**
 * Fetches trivia questions from the backend based on the provided game settings.
 */
export async function getQuestions(
  amount: number,
  category?: string,
  difficulty?: string,
  type?: string,
): Promise<TriviaQuestion[]> {
  // Build query parameters from required and optional arguments
  const query = new URLSearchParams({
    amount: amount.toString(),
    ...(category && { category }),
    ...(difficulty && { difficulty }),
    ...(type && { type }),
  });

  // Request questions from the backend trivia endpoint
  const response = await fetch(
    `http://localhost:3001/trivia/questions?${query}`,
  );

  // Throw an error if the request fails
  if (!response.ok) throw new Error('Failed to fetch questions');

  // Return parsed trivia questions
  return response.json();
}
