export interface GameSettingsDto {
  amount: number;             // Number of questions
  category: string;           // Category ID or 'any'
  difficulty: 'easy' | 'medium' | 'hard' | 'any';
  type: 'multiple' | 'boolean' | 'any';
}
