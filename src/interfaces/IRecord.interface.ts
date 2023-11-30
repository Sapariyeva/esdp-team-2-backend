export interface IRecord {
  id?: number;
  address: string;
  patientId: number;
  psychologistId: number;
  cityId: number;
  format: 'online' | 'offline';
  cost: number;
  duration?: number;
  broadcast: string;
  isCanceled: boolean;
  datetime: string;
  patientName: string;
}
