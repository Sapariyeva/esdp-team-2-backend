import path from 'path';

const rootPath = path.resolve(__dirname, '..', '..');

const config = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  secretKey: 'secretKey',
  secretKeyRefresh: 'secretKeyRefresh',
};

export default config;
