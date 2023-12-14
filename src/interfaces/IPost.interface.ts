export interface IPost {
  id?: number | undefined;
  psychologistId?: number;
  title: string;
  description: string;
  image?: string;
}

export interface IPostText {
  psychologistId?: number;
  title: string;
  description: string;
}
