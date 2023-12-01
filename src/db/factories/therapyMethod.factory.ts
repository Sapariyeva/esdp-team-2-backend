import { setSeederFactory } from 'typeorm-extension';
import { TherapyMethod } from '../../entities/therapyMethod.entity';

const therapyArray = [
  'Интегративная терапия',
  'FACT-ACT - краткосрочная терапия',
  'Логотерапия',
  'Арт-терапия',
  'Телесная терапия',
  'Психоанализ',
  'Когнитивно-поведенческая терапия',
  'Гештальт-терапия',
  'Клиент-центрированная психотерапия',
];

let currentIndex = 0;

export const TherapyMethodFactory = setSeederFactory(TherapyMethod, () => {
  const therapyMethod = new TherapyMethod();
  therapyMethod.name = therapyArray[currentIndex];
  currentIndex = (currentIndex + 1) % therapyArray.length;
  return therapyMethod;
});
