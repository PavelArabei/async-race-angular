export type Car = {
  name: string;
  color: string;
  id: number;
};

export type CarWithoutId = Omit<Car, 'id'>;
