import cron from 'node-cron';
import { RecordService } from './services/record.service';
import { ApiError } from './helpers/api-error';
const recordService = new RecordService();

cron.schedule('20 * * * *', async () => {
  const updatingOfPendingEntries = await recordService.updatingOfPendingEntries();
  if (!updatingOfPendingEntries) throw ApiError.BadRequest('Не удалось проверить статусы');
});
