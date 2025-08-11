import { intervalsOverlap } from '../lib/validators';

describe('intervalsOverlap', () => {
  it('detects overlap', () => {
    const aStart = new Date('2023-01-01T10:00:00Z');
    const aEnd = new Date('2023-01-01T12:00:00Z');
    const bStart = new Date('2023-01-01T11:00:00Z');
    const bEnd = new Date('2023-01-01T13:00:00Z');
    expect(intervalsOverlap(aStart, aEnd, bStart, bEnd)).toBe(true);
  });
  it('no overlap when adjacent', () => {
    const aStart = new Date('2023-01-01T10:00:00Z');
    const aEnd = new Date('2023-01-01T12:00:00Z');
    const bStart = new Date('2023-01-01T12:00:00Z');
    const bEnd = new Date('2023-01-01T13:00:00Z');
    expect(intervalsOverlap(aStart, aEnd, bStart, bEnd)).toBe(false);
  });
});


