//! Task-related "preflight" checks.
//!
//! These should check configuration and preconditions for worker and tasks,
//! and fail early for fatal problems.

use crate::preflight::types::CheckLevel;

pub mod checks;
pub mod types;

/// Run all checks for [`CheckLevel::from_env`].
pub async fn run_checks_from_env() -> anyhow::Result<()> {
    let level = CheckLevel::from_env()?;
    run_checks(level).await
}

/// Run all checks.
pub async fn run_checks(level: CheckLevel) -> anyhow::Result<()> {
    log::info!(target: "preflight", "running preflight checks:");
    tokio::try_join!(
        checks::check_redis_task_records(level),
        checks::check_onfido(level),
        checks::check_twilio(level),
    )?;
    log::info!(target: "preflight", "preflight checks successful");
    Ok(())
}
