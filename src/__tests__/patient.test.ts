import request from 'supertest';
import app from '../index';

describe('patients', () => {
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE3MDcxNjIzNjcsImV4cCI6MTcwNzE2MzI2N30.0SNradztJMS0QTiptbPCxc2nwyLemRk5_6CxhLRzGHs';
  const psychologistId = 1;
  const patientId = 1;

  test('GET /patients endpoint', async () => {
    const response = await request(app.app).get('/patients');

    expect(response.status).toBe(200);

    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length > 0) {
      const firstPatient = response.body[0];

      expect(firstPatient).toHaveProperty('id');
      expect(firstPatient).toHaveProperty('name');
      expect(firstPatient).toHaveProperty('userId');

      expect(typeof firstPatient.id).toBe('number');
      expect(typeof firstPatient.name).toBe('string');
      expect(typeof firstPatient.userId).toBe('number');
    }
  });

  test('GET /patients/:id endpoint', async () => {
    const response = await request(app.app).get(`/patients/${patientId}`);

    expect(response.status).toBe(200);

    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    const patient = response.body;

    expect(patient).toHaveProperty('id');
    expect(patient).toHaveProperty('name');
    expect(patient).toHaveProperty('userId');

    expect(typeof patient.id).toBe('number');
    expect(typeof patient.name).toBe('string');
    expect(typeof patient.userId).toBe('number');
  });

  test('POST /patients/viewedPsychologists/:id endpoint', async () => {
    const response = await request(app.app).post(`/patients/viewedPsychologists/${psychologistId}`).set('Authorization', `${authToken}`).send();

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient).toHaveProperty('patientId');
      expect(patient).toHaveProperty('psychologistId');
      expect(patient).toHaveProperty('addedAt');

      expect(typeof patient.id).toBe('number');
      expect(typeof patient.patientId).toBe('number');
      expect(typeof patient.addedAt).toBe('string');
      expect(typeof patient.psychologistId).toBe('number');
    });
  });

  test('GET /patients/viewedPsychologists endpoint', async () => {
    const response = await request(app.app).get(`/patients/viewedPsychologists`).set('Authorization', `${authToken}`).send();

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length >= 0) {
      response.body.forEach((psychologist) => {
        expect(psychologist).toHaveProperty('id');
        expect(typeof psychologist.id).toBe('number');

        expect(psychologist).toHaveProperty('userId');
        expect(typeof psychologist.userId).toBe('number');

        expect(psychologist).toHaveProperty('fullName');
        expect(typeof psychologist.fullName).toBe('string');

        expect(psychologist).toHaveProperty('birthday');
        expect(typeof psychologist.birthday).toBe('string');

        expect(psychologist).toHaveProperty('address');
        expect(['string', 'object']).toContain(typeof psychologist.address);

        expect(psychologist).toHaveProperty('description');
        expect(typeof psychologist.description).toBe('string');

        expect(psychologist).toHaveProperty('video');
        expect(['string', 'object']).toContain(typeof psychologist.video);

        expect(psychologist).toHaveProperty('experienceYears');
        expect(typeof psychologist.experienceYears).toBe('number');

        expect(psychologist).toHaveProperty('education');
        expect(typeof psychologist.education).toBe('string');

        expect(psychologist).toHaveProperty('cost');
        expect(typeof psychologist.cost).toBe('number');

        expect(psychologist).toHaveProperty('selfTherapy');
        expect(typeof psychologist.selfTherapy).toBe('number');

        expect(psychologist).toHaveProperty('lgbt');
        expect(typeof psychologist.lgbt).toBe('boolean');

        expect(psychologist).toHaveProperty('isPublish');
        expect(typeof psychologist.isPublish).toBe('boolean');

        expect(psychologist).toHaveProperty('gender');
        expect(typeof psychologist.gender).toBe('string');

        expect(psychologist).toHaveProperty('languages');
        expect(typeof psychologist.languages).toBe('object');

        expect(psychologist).toHaveProperty('format');
        expect(typeof psychologist.format).toBe('object');

        expect(psychologist).toHaveProperty('consultationType');
        expect(typeof psychologist.consultationType).toBe('object');

        expect(psychologist).toHaveProperty('cityId');
        expect(typeof psychologist.cityId).toBe('number');

        expect(psychologist).toHaveProperty('photos');
        expect(Array.isArray(psychologist.photos)).toBeTruthy();
        expect(psychologist.photos.length).toBeGreaterThan(0);
        psychologist.photos.forEach((photo) => {
          expect(photo).toHaveProperty('id');
          expect(typeof photo.id).toBe('number');

          expect(photo).toHaveProperty('photo');
          expect(typeof photo.photo).toBe('string');

          expect(photo).toHaveProperty('psychologistId');
          expect(typeof photo.psychologistId).toBe('number');
        });

        expect(psychologist).toHaveProperty('city');
        const city = psychologist.city;

        expect(city).toHaveProperty('id');
        expect(typeof city.id).toBe('number');

        expect(city).toHaveProperty('name');
        expect(typeof city.name).toBe('string');

        expect(city).toHaveProperty('country');
        expect(typeof city.country).toBe('string');

        expect(psychologist).toHaveProperty('certificates');
        expect(Array.isArray(psychologist.certificates)).toBeTruthy();
        expect(psychologist.certificates.length).toBeGreaterThan(0);
        psychologist.certificates.forEach((certificate) => {
          expect(certificate).toHaveProperty('id');
          expect(typeof certificate.id).toBe('number');

          expect(certificate).toHaveProperty('certificate');
          expect(typeof certificate.certificate).toBe('string');

          expect(certificate).toHaveProperty('psychologistId');
          expect(typeof certificate.psychologistId).toBe('number');
        });

        expect(psychologist).toHaveProperty('techniques');
        expect(Array.isArray(psychologist.techniques)).toBeTruthy();
        psychologist.techniques.forEach((technique) => {
          expect(technique).toHaveProperty('id');
          expect(typeof technique.id).toBe('number');

          expect(technique).toHaveProperty('name');
          expect(typeof technique.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('therapyMethods');
        expect(Array.isArray(psychologist.therapyMethods)).toBeTruthy();
        psychologist.therapyMethods.forEach((therapyMethod) => {
          expect(therapyMethod).toHaveProperty('id');
          expect(typeof therapyMethod.id).toBe('number');

          expect(therapyMethod).toHaveProperty('name');
          expect(typeof therapyMethod.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('symptoms');
        expect(Array.isArray(psychologist.symptoms)).toBeTruthy();
        psychologist.symptoms.forEach((symptom) => {
          expect(symptom).toHaveProperty('id');
          expect(typeof symptom.id).toBe('number');

          expect(symptom).toHaveProperty('name');
          expect(typeof symptom.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('workTime');
        expect(Array.isArray(psychologist.workTime)).toBeTruthy();
        psychologist.workTime.forEach((workTime) => {
          expect(workTime).toHaveProperty('id');
          expect(typeof workTime.id).toBe('number');

          expect(workTime).toHaveProperty('date');
          expect(typeof workTime.date).toBe('string');

          expect(workTime).toHaveProperty('time');
          expect(typeof workTime.time).toBe('string');

          expect(workTime).toHaveProperty('psychologistId');
          expect(typeof workTime.psychologistId).toBe('number');

          expect(workTime).toHaveProperty('available');
          expect(typeof workTime.available).toBe('boolean');
        });
      });
    }
  });

  test('GET /patients/actual endpoint', async () => {
    const response = await request(app.app).get(`/patients/actual`).set('Authorization', `${authToken}`).send();

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length >= 0) {
      response.body.forEach((appointment) => {
        expect(appointment).toHaveProperty('id');
        expect(typeof appointment.id).toBe('number');

        expect(appointment).toHaveProperty('patientId');
        expect(typeof appointment.patientId).toBe('number');

        expect(appointment).toHaveProperty('psychologistId');
        expect(typeof appointment.psychologistId).toBe('number');

        expect(appointment).toHaveProperty('slotId');
        expect(typeof appointment.slotId).toBe('number');

        expect(appointment).toHaveProperty('psychologistName');
        expect(typeof appointment.psychologistName).toBe('string');

        expect(appointment).toHaveProperty('cityId');
        expect(typeof appointment.cityId).toBe('number');

        expect(appointment).toHaveProperty('format');
        expect(typeof appointment.format).toBe('string');

        expect(appointment).toHaveProperty('cost');
        expect(typeof appointment.cost).toBe('number');

        expect(appointment).toHaveProperty('duration');
        expect(typeof appointment.duration).toBe('number');

        expect(appointment).toHaveProperty('broadcast');
        expect(['string', 'object']).toContain(typeof appointment.broadcast);

        expect(appointment).toHaveProperty('datetime');
        expect(typeof appointment.datetime).toBe('string');

        expect(appointment).toHaveProperty('patientName');
        expect(typeof appointment.patientName).toBe('string');

        expect(appointment).toHaveProperty('status');
        expect(typeof appointment.status).toBe('string');

        expect(appointment).toHaveProperty('patientAbsent');
        expect(typeof appointment.patientAbsent).toBe('boolean');

        expect(appointment).toHaveProperty('psychologistAbsent');
        expect(typeof appointment.psychologistAbsent).toBe('boolean');

        expect(appointment).toHaveProperty('address');
        expect(['string', 'object']).toContain(typeof appointment.address);

        expect(appointment).toHaveProperty('commentPatient');
        expect(['string', 'object']).toContain(typeof appointment.commentPatient);

        expect(appointment).toHaveProperty('commentPsychologist');
        expect(['string', 'object']).toContain(typeof appointment.commentPsychologist);
      });
    }
  });

  test('GET /patients/history endpoint', async () => {
    const response = await request(app.app).get(`/patients/history`).set('Authorization', `${authToken}`).send();

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length >= 0) {
      response.body.forEach((appointment) => {
        expect(appointment).toHaveProperty('id');
        expect(typeof appointment.id).toBe('number');

        expect(appointment).toHaveProperty('patientId');
        expect(typeof appointment.patientId).toBe('number');

        expect(appointment).toHaveProperty('psychologistId');
        expect(typeof appointment.psychologistId).toBe('number');

        expect(appointment).toHaveProperty('slotId');
        expect(typeof appointment.slotId).toBe('number');

        expect(appointment).toHaveProperty('psychologistName');
        expect(typeof appointment.psychologistName).toBe('string');

        expect(appointment).toHaveProperty('cityId');
        expect(typeof appointment.cityId).toBe('number');

        expect(appointment).toHaveProperty('format');
        expect(typeof appointment.format).toBe('string');

        expect(appointment).toHaveProperty('cost');
        expect(typeof appointment.cost).toBe('number');

        expect(appointment).toHaveProperty('duration');
        expect(typeof appointment.duration).toBe('number');

        expect(appointment).toHaveProperty('broadcast');
        expect(['string', 'object']).toContain(typeof appointment.broadcast);

        expect(appointment).toHaveProperty('datetime');
        expect(typeof appointment.datetime).toBe('string');

        expect(appointment).toHaveProperty('patientName');
        expect(typeof appointment.patientName).toBe('string');

        expect(appointment).toHaveProperty('status');
        expect(typeof appointment.status).toBe('string');

        expect(appointment).toHaveProperty('patientAbsent');
        expect(typeof appointment.patientAbsent).toBe('boolean');

        expect(appointment).toHaveProperty('psychologistAbsent');
        expect(typeof appointment.psychologistAbsent).toBe('boolean');

        expect(appointment).toHaveProperty('address');
        expect(['string', 'object']).toContain(typeof appointment.address);

        expect(appointment).toHaveProperty('commentPatient');
        expect(['string', 'object']).toContain(typeof appointment.commentPatient);

        expect(appointment).toHaveProperty('commentPsychologist');
        expect(['string', 'object']).toContain(typeof appointment.commentPsychologist);
      });
    }
  });

  test('POST /patients/favorites endpoint', async () => {
    const response = await request(app.app)
      .post(`/patients/favorites`)
      .set('Authorization', `${authToken}`)
      .send({ psychologistId: `${psychologistId}` });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length >= 0) {
      response.body.forEach((psychologist) => {
        expect(psychologist).toHaveProperty('id');
        expect(typeof psychologist.id).toBe('number');

        expect(psychologist).toHaveProperty('userId');
        expect(typeof psychologist.userId).toBe('number');

        expect(psychologist).toHaveProperty('fullName');
        expect(typeof psychologist.fullName).toBe('string');

        expect(psychologist).toHaveProperty('birthday');
        expect(typeof psychologist.birthday).toBe('string');

        expect(psychologist).toHaveProperty('address');
        expect(['string', 'object']).toContain(typeof psychologist.address);

        expect(psychologist).toHaveProperty('description');
        expect(typeof psychologist.description).toBe('string');

        expect(psychologist).toHaveProperty('video');
        expect(['string', 'object']).toContain(typeof psychologist.video);

        expect(psychologist).toHaveProperty('experienceYears');
        expect(typeof psychologist.experienceYears).toBe('number');

        expect(psychologist).toHaveProperty('education');
        expect(typeof psychologist.education).toBe('string');

        expect(psychologist).toHaveProperty('cost');
        expect(typeof psychologist.cost).toBe('number');

        expect(psychologist).toHaveProperty('selfTherapy');
        expect(typeof psychologist.selfTherapy).toBe('number');

        expect(psychologist).toHaveProperty('lgbt');
        expect(typeof psychologist.lgbt).toBe('boolean');

        expect(psychologist).toHaveProperty('isPublish');
        expect(typeof psychologist.isPublish).toBe('boolean');

        expect(psychologist).toHaveProperty('gender');
        expect(typeof psychologist.gender).toBe('string');

        expect(psychologist).toHaveProperty('languages');
        expect(typeof psychologist.languages).toBe('object');

        expect(psychologist).toHaveProperty('format');
        expect(typeof psychologist.format).toBe('object');

        expect(psychologist).toHaveProperty('consultationType');
        expect(typeof psychologist.consultationType).toBe('object');

        expect(psychologist).toHaveProperty('cityId');
        expect(typeof psychologist.cityId).toBe('number');

        expect(psychologist).toHaveProperty('photos');
        expect(Array.isArray(psychologist.photos)).toBeTruthy();
        expect(psychologist.photos.length).toBeGreaterThan(0);
        psychologist.photos.forEach((photo) => {
          expect(photo).toHaveProperty('id');
          expect(typeof photo.id).toBe('number');

          expect(photo).toHaveProperty('photo');
          expect(typeof photo.photo).toBe('string');

          expect(photo).toHaveProperty('psychologistId');
          expect(typeof photo.psychologistId).toBe('number');
        });

        expect(psychologist).toHaveProperty('city');
        const city = psychologist.city;

        expect(city).toHaveProperty('id');
        expect(typeof city.id).toBe('number');

        expect(city).toHaveProperty('name');
        expect(typeof city.name).toBe('string');

        expect(city).toHaveProperty('country');
        expect(typeof city.country).toBe('string');

        expect(psychologist).toHaveProperty('certificates');
        expect(Array.isArray(psychologist.certificates)).toBeTruthy();
        expect(psychologist.certificates.length).toBeGreaterThan(0);
        psychologist.certificates.forEach((certificate) => {
          expect(certificate).toHaveProperty('id');
          expect(typeof certificate.id).toBe('number');

          expect(certificate).toHaveProperty('certificate');
          expect(typeof certificate.certificate).toBe('string');

          expect(certificate).toHaveProperty('psychologistId');
          expect(typeof certificate.psychologistId).toBe('number');
        });

        expect(psychologist).toHaveProperty('techniques');
        expect(Array.isArray(psychologist.techniques)).toBeTruthy();
        psychologist.techniques.forEach((technique) => {
          expect(technique).toHaveProperty('id');
          expect(typeof technique.id).toBe('number');

          expect(technique).toHaveProperty('name');
          expect(typeof technique.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('therapyMethods');
        expect(Array.isArray(psychologist.therapyMethods)).toBeTruthy();
        psychologist.therapyMethods.forEach((therapyMethod) => {
          expect(therapyMethod).toHaveProperty('id');
          expect(typeof therapyMethod.id).toBe('number');

          expect(therapyMethod).toHaveProperty('name');
          expect(typeof therapyMethod.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('symptoms');
        expect(Array.isArray(psychologist.symptoms)).toBeTruthy();
        psychologist.symptoms.forEach((symptom) => {
          expect(symptom).toHaveProperty('id');
          expect(typeof symptom.id).toBe('number');

          expect(symptom).toHaveProperty('name');
          expect(typeof symptom.name).toBe('string');
        });

        expect(psychologist).toHaveProperty('workTime');
        expect(Array.isArray(psychologist.workTime)).toBeTruthy();
        psychologist.workTime.forEach((workTime) => {
          expect(workTime).toHaveProperty('id');
          expect(typeof workTime.id).toBe('number');

          expect(workTime).toHaveProperty('date');
          expect(typeof workTime.date).toBe('string');

          expect(workTime).toHaveProperty('time');
          expect(typeof workTime.time).toBe('string');

          expect(workTime).toHaveProperty('psychologistId');
          expect(typeof workTime.psychologistId).toBe('number');

          expect(workTime).toHaveProperty('available');
          expect(typeof workTime.available).toBe('boolean');
        });
      });
    }
  });

  test('PUT /patients/edit/:id endpoint', async () => {
    const response = await request(app.app).put(`/patients/edit/${patientId}`).set('Authorization', `${authToken}`).send({ name: `Jon` });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    const patient = response.body;

    expect(patient).toHaveProperty('id');
    expect(patient).toHaveProperty('name');
    expect(patient).toHaveProperty('userId');

    expect(typeof patient.id).toBe('number');
    expect(typeof patient.name).toBe('string');
    expect(typeof patient.userId).toBe('number');

    expect(patient).toHaveProperty('favorites');
    expect(Array.isArray(patient.favorites)).toBeTruthy();

    expect(patient).toHaveProperty('lastViewedPsychologists');
    expect(Array.isArray(patient.lastViewedPsychologists)).toBeTruthy();
  });

  test('DELETE /patients/:id endpoint', async () => {
    const response = await request(app.app).delete(`/patients/2`);

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    const patient = response.body;

    expect(patient).toHaveProperty('id');
    expect(typeof patient.id).toBe('number');
  });
});
