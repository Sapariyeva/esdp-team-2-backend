import { setSeederFactory } from 'typeorm-extension';
import { Symptom } from '../../entities/symptom.entity';

const symptomsArray = [
  'Стресс',
  'Нестабильная самооценка',
  'Перепады настроения',
  'Ощущение одиночества',
  'Эмоциональная зависимость',
  'Расстройство пищевого поведения',
  'Навязчивые мысли о здоровье',
  'Упадок сил',
  'Приступы страха и тревоги',
  'Раздражительность',
  'Проблемы с концентрацией',
  'Проблемы со сном',
  'Панические атаки',
  'Сложности с алкоголем / наркотиками',
];

let currentIndex = 0;

export const SymptomsFactory = setSeederFactory(Symptom, () => {
  const symptoms = new Symptom();
  symptoms.name = symptomsArray[currentIndex];
  currentIndex = (currentIndex + 1) % symptomsArray.length;
  return symptoms;
});
