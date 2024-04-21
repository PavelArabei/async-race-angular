export type Winner = {
  time: number;
  id: number;
  wins: number;
};

export type WinnerWithoutId = Omit<Winner, 'id'>;
