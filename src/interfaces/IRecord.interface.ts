export interface IRecord {
  id?: number;
  address: string | null;
  patientId: number;
  psychologistId: number;
  cityId: number;
  format: 'online' | 'offline';
  cost: number;
  duration?: number;
  broadcast: string | null;
  isCanceled: boolean;
  datetime: string;
  patientName: string;
}
