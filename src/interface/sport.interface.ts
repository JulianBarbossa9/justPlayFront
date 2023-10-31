export interface SportInteface {
  name: string;
  description: string | null;
  image: string | null;
  team: number | null
  createdAt: Date;
  updatedAt: Date;
  id?: number;
}
