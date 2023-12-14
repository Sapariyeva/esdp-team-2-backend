import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Psychologist } from '../../entities/psychologist.entity';
import { Certificate } from '../../entities/certificate.entity';
import { Photo } from '../../entities/photo.entity';
import { EFormat } from '../../enum/EFormat';
import { ELanguages } from '../../enum/ELanguages';
import { EConsultationType } from '../../enum/EConsultationType';
import { EGender } from '../../enum/EGender';

export const PsychologistFactory = setSeederFactory(Psychologist, (faker: Faker) => {
  const psychologist = new Psychologist();
  psychologist.fullName = faker.person.fullName();
  psychologist.gender = faker.helpers.arrayElement(Object.values(EGender));
  psychologist.birthday = faker.date.birthdate();
  psychologist.format = faker.helpers.arrayElements(Object.values(EFormat), faker.number.int({ min: 1, max: 2 }));
  psychologist.description = faker.commerce.productDescription();
  psychologist.experienceYears = faker.number.int({ min: 0, max: 20 });
  psychologist.languages = faker.helpers.arrayElements(Object.values(ELanguages), faker.number.int({ min: 1, max: 3 }));
  psychologist.cost = faker.number.int({ min: 5000, max: 20000 });
  psychologist.consultationType = faker.helpers.arrayElements(Object.values(EConsultationType), faker.number.int({ min: 1, max: 2 }));
  psychologist.selfTherapy = faker.number.int({ min: 0, max: 10 });
  psychologist.lgbt = faker.datatype.boolean();
  psychologist.isPublish = faker.datatype.boolean({ probability: 0.85 });

  psychologist.certificates = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => {
    const certificateSchema = new Certificate();
    certificateSchema.certificate = 'test-certificate.jpg';
    return certificateSchema;
  });

  psychologist.photos = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
    const photoSchema = new Photo();
    photoSchema.photo = 'test-psychologist.png';
    return photoSchema;
  });

  psychologist.education = faker.helpers.arrayElement([
    '2003 - МГУ - факультет психологии, клиническая психология - бакалавр.',
    '2010 - ВШЭ - психоанализ - магистерская программа (2 года).',
    '2019 - Институт психотерапии и клинической психологии. - Профессиональная переподготовка по клинической психологии.',
    '1996 - Санкт-Петербургский государственный университет. - Философ, преподаватель философии и социально-политических дисциплин.',
    '2021 - Общероссийская профессиональная психотерапевтическая лига. - Сертификат «Системная семейная психотерапия восточная версия».',
  ]);

  if (faker.datatype.boolean({ probability: 0.8 })) {
    psychologist.video = faker.helpers.arrayElement([
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=9bZkp7q19f0',
      'https://www.youtube.com/watch?v=A1Qb4zfurA8',
      'https://www.youtube.com/watch?v=K9X7nCjiH88',
      'https://www.youtube.com/watch?v=2SqMd9T50Ps',
    ]);
  }

  if (psychologist.format.some((format) => format === EFormat.Offline)) {
    psychologist.address = faker.helpers.arrayElement([
      'Улица Абая, дом 15, квартира 3',
      'Проспект Достык, дом 42, квартира 7',
      'Переулок Жамбыла, дом 9',
      'Улица Кабанбай батыра, дом 27, квартира 12',
      'Проспект Республики, дом 101',
    ]);
  }
  return psychologist;
});
