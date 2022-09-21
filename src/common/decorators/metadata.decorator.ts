import { SetMetadata } from '@nestjs/common';

export const METADATA_KEY = 'metadata';

interface MetadataValue {
  name: string;
  content: string;
  when: Date;
}

const metadataValue: MetadataValue = {
  name: 'What is Metadata?',
  content: 'https://www.youtube.com/watch?v=HXAstVP3-y0',
  when: new Date(),
};

export const Metadata = () =>
  SetMetadata<string, MetadataValue>(METADATA_KEY, metadataValue);
