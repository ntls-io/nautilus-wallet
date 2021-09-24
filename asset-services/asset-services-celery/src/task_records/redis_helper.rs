//! Lower-level Redis command helper for [`super::redis_impl`].

use std::time::Duration;

use redis::aio::Connection;
use redis::{cmd, RedisResult};

/// Wrap [`Connection`] with a Rusty interface to the Redis commands we're interested in.
pub struct RedisHelper {
    pub connection: Connection,
}

impl RedisHelper {
    pub(crate) fn new(connection: Connection) -> Self {
        Self { connection }
    }

    /// Docs: <https://redis.io/commands/ping>
    pub async fn ping(&mut self) -> RedisResult<String> {
        cmd("PING").query_async(&mut self.connection).await
    }

    /// Push element into a list.
    ///
    /// Docs:
    /// - <https://redis.io/commands/lpush>
    /// - <https://redis.io/commands/rpush>
    pub(crate) async fn push(
        &mut self,
        side: ListSide,
        key: impl AsRef<str>,
        value: impl AsRef<str>,
    ) -> RedisResult<u64> {
        cmd(match side {
            ListSide::Left => "LPUSH",
            ListSide::Right => "RPUSH",
        })
        .arg(key.as_ref())
        .arg(value.as_ref())
        .query_async(&mut self.connection)
        .await
    }

    /// Blocking atomic list element move operation.
    ///
    /// Docs: <https://redis.io/commands/blmove>
    pub(crate) async fn blmove(
        &mut self,
        source: impl AsRef<str>,
        destination: impl AsRef<str>,
        wherefrom: ListSide,
        whereto: ListSide,
        timeout: Duration,
    ) -> RedisResult<Option<String>> {
        cmd("BLMOVE")
            .arg(source.as_ref())
            .arg(destination.as_ref())
            .arg(wherefrom.to_string())
            .arg(whereto.to_string())
            .arg(timeout.as_secs_f64())
            .query_async(&mut self.connection)
            .await
    }
}

#[derive(Copy, Clone, Eq, PartialEq, Debug)]
pub enum ListSide {
    Left,
    Right,
}

impl ToString for ListSide {
    fn to_string(&self) -> String {
        match self {
            ListSide::Left => "LEFT",
            ListSide::Right => "RIGHT",
        }
        .to_string()
    }
}
