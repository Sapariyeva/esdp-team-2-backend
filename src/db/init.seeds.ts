import { runSeeders } from 'typeorm-extension';
import { appDataSource } from '../config/dataSource';

appDataSource.initialize().then(async () => {
  await appDataSource.synchronize(true);
  await runSeeders(appDataSource);
  appDataSource.destroy();
});
