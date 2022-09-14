import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('Value is not a number.');
    }

    return parsedValue;
  }
}
