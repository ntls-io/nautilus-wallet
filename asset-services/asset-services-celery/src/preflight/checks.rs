//! Preflight check implementations.

use crate::preflight::types::CheckLevel;
use crate::task_records::redis_impl::RedisTaskRecords;
use crate::tasks;

const LOG_LOCAL: &str = "preflight::local";
const LOG_REMOTE: &str = "preflight::remote";

/// Check [`RedisTaskRecords`] connectivity.
///
/// This currently doubles as a check for Celery's Redis broker connectivity, too.
pub async fn check_redis_task_records(level: CheckLevel) -> anyhow::Result<()> {
    if level.local() {
        let mut task_records = RedisTaskRecords::from_env().await?;
        log::info!(target: LOG_LOCAL, "RedisTaskRecords configured");
        if level.remote() {
            let returned = task_records.redis.ping().await?;
            log::info!(target: LOG_REMOTE, "Redis ping: {:?}", returned);
        }
    }
    Ok(())
}

pub async fn check_onfido(level: CheckLevel) -> anyhow::Result<()> {
    if level.local() {
        let client = tasks::kyc::init_onfido_client()?;
        log::info!(target: LOG_LOCAL, "Onfido client configured");
        if level.remote() {
            let returned = client.ping().await?;
            log::info!(target: LOG_REMOTE, "Onfido health check: {}", returned);
        }
    }
    Ok(())
}

pub async fn check_twilio_verify(level: CheckLevel) -> anyhow::Result<()> {
    if level.local() {
        let client = tasks::verification::init_verify_client()?;
        log::info!(target: LOG_LOCAL, "Twilio Verify client configured");
        if level.remote() {
            let service = client.fetch_current_service().await?;
            log::info!(
                target: LOG_REMOTE,
                "Twilio Verify service: friendly_name={:?} code_length={}",
                service.friendly_name.unwrap_or_default(),
                service.code_length.unwrap_or_default(),
            );
        }
    }
    Ok(())
}
