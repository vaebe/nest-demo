import { Logger } from '@nestjs/common';
import { TypeormFilter } from './typeorm.filter';

describe('TypeormFilter', () => {
  it('should be defined', () => {
    expect(new TypeormFilter(Logger)).toBeDefined();
  });
});
