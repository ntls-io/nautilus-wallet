import * as xrpl from 'xrpl';
import {
  checkRippledErrorResponse,
  hexToUint8Array,
  txnAfterSign,
  txnBeforeSign,
  uint8ArrayToHex,
} from './xrpl.utils';

describe('signing helpers', () => {
  // Some example expected transaction values:

  const txnUnsigned: xrpl.Payment = {
    Account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
    TransactionType: 'Payment',
    Amount: '1234',
    Destination: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
  };

  const signingPubKey = 'signingPubKey';
  const txnBeingSigned: xrpl.Payment = {
    ...txnUnsigned,
    SigningPubKey: signingPubKey,
  };

  const txnSignature = 'txnSignature';
  const txnSigned: xrpl.Payment = {
    ...txnBeingSigned,
    TxnSignature: txnSignature,
  };

  describe('txnBeforeSign', () => {
    it('works', () => {
      expect(txnBeforeSign(txnUnsigned, signingPubKey)).toEqual({
        txnBeingSigned,
        bytesToSignEncoded:
          '535458001200006140000000000004D2730081144B4E9C06F24296074F7BC48F92A97916C6DC5EA983144B4E9C06F24296074F7BC48F92A97916C6DC5EA9',
      });
    });
  });

  describe('txnAfterSign', () => {
    it('works', () => {
      expect(txnAfterSign(txnBeingSigned, txnSignature)).toEqual({
        txnSigned,
        txnSignedEncoded:
          '1200006140000000000004D27300740081144B4E9C06F24296074F7BC48F92A97916C6DC5EA983144B4E9C06F24296074F7BC48F92A97916C6DC5EA9',
      });
    });
  });
});

describe('hexToUint8Array', () => {
  // Pending upstream bugfix: https://github.com/XRPLF/xrpl.js/pull/1977
  xit('empty', () => {
    expect(hexToUint8Array('')).toEqual(new Uint8Array([]));
  });

  it('some', () => {
    expect(hexToUint8Array('ABCDEF')).toEqual(
      new Uint8Array([0xab, 0xcd, 0xef])
    );
  });
});

describe('uint8ArrayToHex', () => {
  it('empty', () => {
    expect(uint8ArrayToHex(new Uint8Array([]))).toEqual('');
  });
  it('some', () => {
    expect(uint8ArrayToHex(new Uint8Array([0xab, 0xcd, 0xef]))).toEqual(
      'ABCDEF'
    );
  });
});

describe('checkRippledErrorResponse', () => {
  const exampleErrorResponse: xrpl.ErrorResponse = {
    id: 'stub id',
    status: 'error',
    type: 'response',
    error: 'stub error',
    request: {
      command: 'ping',
    },
  };

  it('works', () => {
    const err = new xrpl.RippledError('error message', exampleErrorResponse);
    expect(checkRippledErrorResponse(err)).toEqual(exampleErrorResponse);
  });

  it('ignores RippledError without data', () => {
    const err = new xrpl.RippledError('error message');
    expect(checkRippledErrorResponse(err)).toBeUndefined();
  });

  it('ignores Error', () => {
    expect(checkRippledErrorResponse(new Error('other'))).toBeUndefined();
  });

  it('ignores Error with data', () => {
    const error = new Error('other');
    (error as any).data = exampleErrorResponse;
    expect(checkRippledErrorResponse(error)).toBeUndefined();
  });
});
