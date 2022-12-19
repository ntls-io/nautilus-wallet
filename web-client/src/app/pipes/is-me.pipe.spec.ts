import { IsMePipe } from './is-me.pipe';

describe('IsMePipe', () => {
  it('create an instance', () => {
    const pipe = new IsMePipe();
    expect(pipe).toBeTruthy();
  });
});
