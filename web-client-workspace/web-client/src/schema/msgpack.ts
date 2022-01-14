/** MessagePack helper functions. */

import { Decoder, Encoder } from '@msgpack/msgpack';
import { Bytes } from './types';

/// Enable for verbose from_msgpack / to_msgpack console debugging logs.
const LOG_DEBUG = false;

const encoder = new Encoder();
const decoder = new Decoder();

// TODO: Better type handling.

export const from_msgpack = (bytes: Bytes): unknown => {
  const value = decoder.decode(bytes);
  log_debug('from_msgpack', { value, bytes });
  return value;
};

export const to_msgpack = (value: unknown): Bytes => {
  const bytes = encoder.encode(value);
  log_debug('to_msgpack', { value, bytes });
  return bytes;
};

const log_debug = (
  label: string,
  { value, bytes }: { value: unknown; bytes: Bytes }
) => {
  if (LOG_DEBUG) {
    // eslint-disable-next-line no-console
    console.debug(label, {
      value,
      bytes: base64(bytes),
    });
  }
};

// FIXME: Placeholder casts

export const from_msgpack_as = <T>(bytes: Bytes): T => from_msgpack(bytes) as T;

export const to_msgpack_as = <T>(value: T): Bytes => encoder.encode(value as T);

/// Debugging helper
export const base64 = (bytes: Uint8Array) =>
  btoa(Array.from(bytes, (c) => String.fromCodePoint(c)).join(''));
