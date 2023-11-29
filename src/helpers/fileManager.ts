import fs from 'fs/promises';
import { Request } from 'express';

class FileManager {
  static unlink = async (filename: string, directoryPath: string) => {
    const filePath: string = directoryPath + '/' + filename;
    await fs.unlink(filePath);
  };

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
        this.unlink(filename, directoryPath);
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
      this.unlink(fileName, directoryPath);
      console.log('The file has been successfully deleted');
      return true;
    } catch (err) {
      console.log('The file could not be deleted');
      return false;
    }
  };
}

export default FileManager;
