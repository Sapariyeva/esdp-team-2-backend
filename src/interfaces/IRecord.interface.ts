export interface IRecord {
  id?: number;
  patientId: number;
  psychologistId: number;
  cityId?: number;
  datetime: Date;
  cost?: number;
  duration?: number;
  format: string;
  broadcast?: string;
  address?: string;
  isCanceled?: boolean;
}
