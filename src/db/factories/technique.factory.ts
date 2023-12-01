import { setSeederFactory } from 'typeorm-extension';
import { Technique } from '../../entities/technique.entity';

const techniqueArray = [
  'Методы релаксации',
  'EMDR - Десенсибилизация и переработка при помощи движения глаз',
  'Телесно-ориентированные практики',
  'Расстановки',
  'Психодрама',
  'Cимволдрама',
];

let currentIndex = 0;

export const TechniqueFactory = setSeederFactory(Technique, () => {
  const technique = new Technique();
  technique.name = techniqueArray[currentIndex];
  currentIndex = (currentIndex + 1) % techniqueArray.length;
  return technique;
});
