/** MessagePack helper functions. */

/* eslint-disable @typescript-eslint/naming-convention */

import { Decoder, Encoder } from '@msgpack/msgpack';
import { Bytes } from './types';

const encoder = new Encoder();
const decoder = new Decoder();

// TODO: Better type handling.

export const from_msgpack = (bytes: Bytes): unknown => {
  console.log('XXX from_msgpack:', { bytes: base64(bytes) });
  return decoder.decode(bytes);
};

export const to_msgpack = (value: unknown): Bytes => encoder.encode(value);

// FIXME: Placeholder casts

export const from_msgpack_as = <T>(bytes: Bytes): T => from_msgpack(bytes) as T;

export const to_msgpack_as = <T>(value: T): Bytes => encoder.encode(value as T);

/// Debugging helper
export const base64 = (bytes: Uint8Array) =>
  btoa(Array.from(bytes, (c) => String.fromCodePoint(c)).join(''));
