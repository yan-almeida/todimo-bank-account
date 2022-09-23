import { v4 as uuid } from 'uuid';
import { getExtension } from './get-extension.util';

export const createFileName = (fileName: string) => {
  const extension = getExtension(fileName);

  const [name] = fileName.split('.'); // test-t-s-fs-t-a.csv test.test.test.csv

  return `${uuid()}-${name}${extension}`;
};
