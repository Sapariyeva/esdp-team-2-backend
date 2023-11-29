import { setSeederFactory } from 'typeorm-extension';
import { Technique } from '../../entities/technique.entity';

const techniqueArray = [
  'Активное слушание',
  'Эмпатия',
  'Рациональная эмоциональная терапия (РЭТ)',
  'Методы релаксации',
  'Ассертивность',
  'Проективные методы',
  'Биофидбек',
  'Системная терапия',
  'Позитивная психология',
];

let currentIndex = 0;

export const TechniqueFactory = setSeederFactory(Technique, () => {
  const technique = new Technique();
  technique.name = techniqueArray[currentIndex];
  currentIndex = (currentIndex + 1) % techniqueArray.length;
  return technique;
});
