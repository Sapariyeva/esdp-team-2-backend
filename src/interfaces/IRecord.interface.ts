export interface IRecord {
  id: number;
  address: string | null;
  patientId: number;
  psychologistId: number;
  slotId: number;
  psychologistName: string;
  cityId: number;
  format: 'online' | 'offline';
  cost: number;
  duration?: number;
  broadcast: string | null;
  status: 'Ожидается' | 'Отменёно' | 'Проведено' | 'Психолог не присутствовал' | 'Пациент не присутствовал';
  datetime: string;
  patientName: string;
  psychologistAbsent: boolean;
  patientAbsent: boolean;
  commentPatient: string;
  commentPsychologist: string;
}
