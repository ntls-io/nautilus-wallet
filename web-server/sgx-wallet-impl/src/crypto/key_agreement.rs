use x25519_dalek::StaticSecret;

use super::common::*;

pub struct DiffieHellman {
    ctx: Option<Context>,
    our_keys: KeyPair,
}

impl DiffieHellman {
    pub fn new(our_keys: KeyPair, dh_context: Option<&[u8]>) -> Self {
        let ctx = dh_context.and_then(|ctx| -> Option<[u8; 32]> {
            Some(hash_when_too_long(ctx))
        });
        Self { ctx, our_keys }
    }
    #[must_use]
    pub fn diffie_hellman(&self, their_pk: &PublicKey) -> SharedSecret {
        let our_sk = StaticSecret::from(*self.our_keys.sk.expose_secret());
        let raw_shared_secret = our_sk
            .diffie_hellman(&x25519_dalek::PublicKey::from(*their_pk))
            .to_bytes();

        let hkdf = self.ctx.map_or_else(
            || HkdfSha256::new(None, &raw_shared_secret),
            |salt| HkdfSha256::new(Some(&salt), &raw_shared_secret),
        );

        // XXX: RFC 7748 recommends applying a KDF to the raw shared key
        let mut output = <[u8; 32]>::default();
        hkdf_expand(&hkdf, &mut output);
        Secret::new(output)
    }
}
