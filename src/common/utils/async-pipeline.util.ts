import { pipeline } from 'stream';
import { promisify } from 'util';

export const AsyncPipeline = promisify(pipeline);
