import IPsychologist from './IPsychologist.interface';

interface IPsychologistToken {
  id: number;
  refreshToken: string;
  psychologistId: number;
  psychologist?: IPsychologist;
}

export default IPsychologistToken;
