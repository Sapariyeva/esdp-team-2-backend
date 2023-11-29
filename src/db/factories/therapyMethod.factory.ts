import { setSeederFactory } from 'typeorm-extension';
import { TherapyMethod } from '../../entities/therapyMethod.entity';

const therapyArray = [
  'Арт-терапия',
  'Телесная терапия',
  'Психоанализ',
  'Клиент-центрированная психотерапия',
  'Семейная терапия или семейное консультирование',
  'Десенсибилизация и переработка при помощи движения глаз',
  'Гипноз',
  'Психодрама',
  'Гештальт-терапия',
  'Когнитивно-поведенческая терапия',
  'Танцевально-двигательная терапия',
];

let currentIndex = 0;

export const TherapyMethodFactory = setSeederFactory(TherapyMethod, () => {
  const therapyMethod = new TherapyMethod();
  therapyMethod.name = therapyArray[currentIndex];
  currentIndex = (currentIndex + 1) % therapyArray.length;
  return therapyMethod;
});
