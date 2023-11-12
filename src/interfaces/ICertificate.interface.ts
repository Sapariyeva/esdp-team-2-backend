import IPsychologist from './IPsychologist.interface';

interface ICertificate {
  id: number;
  sertificate: string;
  psychologistId: number;
  psychologist?: IPsychologist;
}

export default ICertificate;
