//! Broker-generic interface to [`Celery`].
//!
//! This module allows code to refer to a [`Celery`] instance without hard-coding the choice of broker,
//! using the [`CeleryBox`] type.

use std::io;
use std::sync::Arc;

use celery::broker::{AMQPBroker, RedisBroker};
use celery::error::CeleryError;
use celery::task::{AsyncResult, Signature, Task};
use celery::Celery;
use url::Url;

use self::CeleryBox::{Amqp, Redis};

/// Wrap [`Celery`] struct.
pub enum CeleryBox {
    Amqp(Arc<Celery<AMQPBroker>>),
    Redis(Arc<Celery<RedisBroker>>),
}

impl CeleryBox {
    /// Build an instance using [`Celery::builder`], with the broker determined by the scheme of `broker_url`.
    pub async fn build(name: &str, broker_url: &str) -> Result<Self, CeleryError> {
        let parsed_url = Url::parse(broker_url).map_err(|url_err| {
            io::Error::new(
                io::ErrorKind::InvalidInput,
                format!("invalid broker URL <{}>: {}", broker_url, url_err),
            )
        })?;
        let celery_box = match parsed_url.scheme() {
            "amqp" | "amqps" => Amqp(Arc::new(
                Celery::<AMQPBroker>::builder(name, broker_url)
                    .build()
                    .await?,
            )),
            "redis" | "rediss" | "redis+unix" => Redis(Arc::new(
                Celery::<RedisBroker>::builder(name, broker_url)
                    .build()
                    .await?,
            )),
            scheme => {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidInput,
                    format!(
                        "invalid broker URL <{}>: unsupported scheme {}",
                        broker_url, scheme
                    ),
                )
                .into());
            }
        };
        Ok(celery_box)
    }

    /// Call [`Celery::display_pretty`]
    pub async fn display_pretty(&self) {
        match self {
            Amqp(celery) => celery.display_pretty().await,
            Redis(celery) => celery.display_pretty().await,
        }
    }

    /// Call [`Celery::send_task`]
    pub async fn send_task<T: Task>(
        &self,
        task_sig: Signature<T>,
    ) -> Result<AsyncResult, CeleryError> {
        match self {
            Amqp(celery) => celery.send_task(task_sig).await,
            Redis(celery) => celery.send_task(task_sig).await,
        }
    }
    /// Call [`Celery::register_task`]
    pub async fn register_task<T: Task + 'static>(&self) -> Result<(), CeleryError> {
        match self {
            Amqp(celery) => celery.register_task::<T>().await,
            Redis(celery) => celery.register_task::<T>().await,
        }
    }

    /// Call [`Celery::close`]
    pub async fn close(&self) -> Result<(), CeleryError> {
        match self {
            Amqp(celery) => celery.close().await,
            Redis(celery) => celery.close().await,
        }
    }

    /// Call [`Celery::consume`]
    pub async fn consume(&self) -> Result<(), CeleryError> {
        match self {
            Amqp(celery) => celery.consume().await,
            Redis(celery) => celery.consume().await,
        }
    }

    /// Call [`Celery::consume_from`]
    pub async fn consume_from(self, queues: &[&str]) -> Result<(), CeleryError> {
        match self {
            Amqp(celery) => celery.consume_from(queues).await,
            Redis(celery) => celery.consume_from(queues).await,
        }
    }
}
