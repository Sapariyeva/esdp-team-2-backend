import fs from 'fs/promises';
import { Request } from 'express';

class FileManager {
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
}

export default FileManager;