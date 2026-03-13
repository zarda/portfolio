import { describe, it, expect } from 'vitest';
import { Entity } from '../Entity';

interface TestProps {
  name: string;
}

class TestEntity extends Entity<TestProps> {
  constructor(props: TestProps, id: string) {
    super(props, id);
  }
}

describe('Entity', () => {
  it('equals returns true for same id', () => {
    const a = new TestEntity({ name: 'A' }, '1');
    const b = new TestEntity({ name: 'B' }, '1');
    expect(a.equals(b)).toBe(true);
  });

  it('equals returns false for different id', () => {
    const a = new TestEntity({ name: 'A' }, '1');
    const b = new TestEntity({ name: 'A' }, '2');
    expect(a.equals(b)).toBe(false);
  });

  it('toJSON returns props merged with id', () => {
    const entity = new TestEntity({ name: 'Test' }, '42');
    expect(entity.toJSON()).toEqual({ name: 'Test', id: '42' });
  });
});
