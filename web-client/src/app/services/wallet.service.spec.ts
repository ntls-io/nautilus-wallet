import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  arrayViewFromBuffer,
  bufferFromArrayView,
  WalletService,
} from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('WalletService array helpers', () => {
  const nonArrayExamples: Array<[string, unknown]> = [
    ['undefined', undefined],
    ['null', null],
    ['false', false],
    ['true', false],
    ['zero', 0],
    ['empty string', ''],
    ['[]]', []],
    ['{}}', {}],
    ['number', 42],
    ['string', 'spam'],
    ['Array', [1, 2, 3]],
    ['Object', { ham: 'spam' }],
  ];

  describe('arrayViewFromBuffer', () => {
    describe('converts ArrayBuffer', () => {
      for (const [label, buffer, expected] of [
        ['empty', new ArrayBuffer(0), new Uint8Array()],
        ['zeroes', new ArrayBuffer(5), new Uint8Array(5)],
        ['values', new Uint8Array([1, 2, 3]).buffer, new Uint8Array([1, 2, 3])],
      ] as Array<[string, ArrayBuffer, Uint8Array]>) {
        it(label, () => {
          expect(arrayViewFromBuffer(buffer)).toEqual(expected);
        });
      }
    });

    describe('rejects other types', () => {
      for (const [label, value] of [
        ...nonArrayExamples,
        ['Uint8Array', new Uint8Array()],
        ['Uint8Array(5)', new Uint8Array(5)],
      ] as Array<[string, unknown]>) {
        it(label, () => {
          expect(() => arrayViewFromBuffer(value as ArrayBuffer)).toThrowError(
            TypeError,
            'expected ArrayBuffer'
          );
        });
      }
    });
  });

  describe('bufferFromArrayView', () => {
    describe('converts Uint8Array', () => {
      for (const [label, array, expected] of [
        ['empty', new Uint8Array(), new ArrayBuffer(0)],
        ['zeroes', new Uint8Array(5), new ArrayBuffer(5)],
        ['values', new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]).buffer],
        // XXX: The following case is important.
        [
          'sliced view',
          new Uint8Array(new Uint8Array([1, 2, 3, 4, 5]).buffer, 1, 3),
          new Uint8Array([2, 3, 4]).buffer,
        ],
      ] as Array<[string, Uint8Array, ArrayBuffer]>) {
        it(label, () => {
          // XXX: Unlike Uint8Array, ArrayBuffers can't be directly compared with toEqual.
          //      Instead, we compare the buffers by comparing their full (unsliced) Uint8Array views.
          const actual = bufferFromArrayView(array);
          expect(new Uint8Array(actual)).toEqual(new Uint8Array(expected));
        });
      }
    });

    describe('rejects other types', () => {
      for (const [label, value] of [
        ...nonArrayExamples,
        ['ArrayBuffer', new ArrayBuffer(0)],
        ['ArrayBuffer(5)', new ArrayBuffer(5)],
        ['Int8Array', new Int8Array()],
        ['Uint16Array', new Uint16Array()],
      ] as Array<[string, unknown]>) {
        it(label, () => {
          expect(() => bufferFromArrayView(value as Uint8Array)).toThrowError(
            TypeError,
            'expected Uint8Array'
          );
        });
      }
    });
  });
});
