//! Preflight check level type.

use std::str::FromStr;

use env_var_helpers::env_vars;
use strum::EnumString;

/// Specify what level of preflight checks to run (inclusive).
///
/// Generally speaking, each level of checking costs progressively more resources than lower levels,
/// and each includes all the checks of the lower levels.
///
/// Use these values as a total order:
///
/// ```
/// # use asset_services_celery::preflight::types::CheckLevel;
/// use CheckLevel::*;
///
/// assert!(None < Local);
/// assert!(Local < Remote);
/// ```
///
#[derive(Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Debug)] // core
#[derive(EnumString)] // strum
#[strum(ascii_case_insensitive)]
#[strum(serialize_all = "snake_case")]
pub enum CheckLevel {
    /// No checks.
    None,
    /// Check local configuration and state, without connecting to remote systems.
    Local,
    /// Check network connectivity and health of remote systems and APIs.
    Remote,
}

impl CheckLevel {
    /// Get check level from `PREFLIGHT_CHECK_LEVEL`.
    ///
    /// ```
    /// # use asset_services_celery::preflight::types::CheckLevel;
    ///
    /// assert_eq!(CheckLevel::from_env().unwrap(), CheckLevel::Local)
    /// ```
    pub fn from_env() -> anyhow::Result<Self> {
        let value = env_vars::var_default("PREFLIGHT_CHECK_LEVEL", "local")?;
        let level = CheckLevel::from_str(value.trim())?;
        Ok(level)
    }

    /// Run local checks?
    ///
    /// ```
    /// # use asset_services_celery::preflight::types::CheckLevel;
    /// use CheckLevel::*;
    ///
    /// assert_eq!(None.local(), false);
    /// assert_eq!(Local.local(), true);
    /// assert_eq!(Remote.local(), true);
    /// ```
    pub fn local(self) -> bool {
        CheckLevel::Local <= self
    }

    /// Run remote checks?
    ///
    /// ```
    /// # use asset_services_celery::preflight::types::CheckLevel;
    /// use CheckLevel::*;
    ///
    /// assert_eq!(None.remote(), false);
    /// assert_eq!(Local.remote(), false);
    /// assert_eq!(Remote.remote(), true);
    /// ```
    pub fn remote(self) -> bool {
        CheckLevel::Remote <= self
    }
}
