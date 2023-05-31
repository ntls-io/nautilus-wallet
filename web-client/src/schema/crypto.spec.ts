import { HKDF } from '@stablelib/hkdf';
import { SHA256 } from '@stablelib/sha256';
import { X25519KeyAgreement } from '@stablelib/x25519/lib/keyagreement';
import { DiffieHellman, PublicKey, SharedSecret } from './crypto';

describe('DiffieHellman', () => {
  it('successfully established a shared secret', () => {
    const clientSide = DiffieHellman.from_seed(
      new Uint8Array(32).fill(111),
      new Uint8Array(32).fill(123)
    );
    const serverSide = new X25519KeyAgreement(new Uint8Array(32).fill(222));
    const salt = new Uint8Array(32).fill(123);

    const clientPk: PublicKey = clientSide.x25519_public_key();
    const serverRawSecret: SharedSecret = serverSide
      .finish(clientPk)
      .getSharedKey();
    const serverHkdf = new HKDF(SHA256, serverRawSecret, salt);
    const serverSecret: SharedSecret = serverHkdf.expand(32);

    const serverPk: PublicKey = serverSide.offer();
    const clientSecret: SharedSecret = clientSide.diffie_hellman(serverPk);
    expect(clientSecret).toEqual(serverSecret);
  });
});
