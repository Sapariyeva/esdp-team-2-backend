import fs from 'fs/promises';
import { Request } from 'express';

class FileManager {
  private static forbiddenForDeleteFilenames: string[] = ['test-certificate.jpg', 'test-psychologist.png'];

  static deleteFiles = (directoryPath: string, files: Request['files']): boolean => {
    try {
      if (!files) return false;

      const filenameList: string[] = [];

      Array.isArray(files)
        ? files.forEach((file) => filenameList.push(file.filename))
        : Object.values(files)
            .reduce((accumulator, filesData) => accumulator.concat(filesData), [])
            .forEach((file) => filenameList.push(file.filename));

      filenameList.forEach(async (filename) => {
        const filePath: string = directoryPath + '/' + filename;
        await fs.unlink(filePath);
      });

      console.log('The files has been successfully deleted');
      return true;
    } catch (err) {
      console.log('The files could not be deleted');
      return false;
    }
  };

  static deleteFile = async (directoryPath: string, fileName: string): Promise<boolean> => {
    try {
      if (FileManager.isDeletionForbidden(fileName)) throw new Error('Удаление текущего файла запрещено');

      const filePath: string = directoryPath + '/' + fileName;
      await fs.unlink(filePath);
      console.log('The file has been successfully deleted');
      return true;
    } catch (err) {
      console.log('The file could not be deleted');
      return false;
    }
  };

  private static isDeletionForbidden = (filename: string): boolean => {
    return FileManager.forbiddenForDeleteFilenames.some((forbiddenFilename) => forbiddenFilename === filename);
  };
}

export default FileManager;
