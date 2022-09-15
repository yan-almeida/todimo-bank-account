import { PipeTransform } from '@nestjs/common';
export declare class IntPipe implements PipeTransform<string, number> {
    transform(value: string): number;
}
