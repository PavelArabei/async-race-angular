export type Winner = {
  time: number;
  id: number;
  wins: number;
};

export type WinnerWithoutId = Omit<Winner, 'id'>;
export type WinnerWithoutWins = Omit<Winner, 'wins'>;
export type WinnerInNecessaryFormat = Winner & { name: string; color: string };
