import { runSeeders } from 'typeorm-extension';
import { appDataSource } from '../config/dataSource';

appDataSource.initialize().then(async () => {
  try {
    await appDataSource.synchronize(true);
    await runSeeders(appDataSource);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    else console.error('Неизвестная ошибка');
  }

  appDataSource.destroy();
});
