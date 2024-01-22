export interface IChangePresenceStatus {
  recordId: number;
  role: 'patientAbsent' | 'psychologistAbsent' | string;
}
