'use client';

import { useState } from 'react';
import { GameSettingsDto } from '../types/gameSettings';

/**
 * Collects game configuration from the user before starting the trivia game.
 * Emits the selected settings to the parent component on submit.
 */
interface Props {
  onStart: (settings: GameSettingsDto) => void;
}

export default function GameSettings({ onStart }: Props) {
  // Local state for game configuration options
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] =
    useState<'easy' | 'medium' | 'hard' | 'any'>('easy');
  const [type, setType] =
    useState<'multiple' | 'boolean' | 'any'>('multiple');

  // Submit selected settings to the parent component
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ amount, category, difficulty, type });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-blue-100 rounded space-y-4">
      <div>
        <label>Number of Questions:</label>
        <input
          type="number"
          min={1}
          max={50}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border p-1 rounded ml-2"
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-1 rounded ml-2"
        >
          <option value="any">Any</option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="17">Science & Nature</option>
          <option value="21">Sports</option>
        </select>
      </div>

      <div>
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value as any)}
          className="border p-1 rounded ml-2"
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label>Type:</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as any)}
          className="border p-1 rounded ml-2"
        >
          <option value="any">Any</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Start Game
      </button>
    </form>
  );
}
