//! Error handling helpers.

use core::fmt::Display;
use std::fmt::Debug;
use std::prelude::v1::String;

/// Error message with a pretty-printed debug value.
pub(crate) fn message_with_debug_value(
    function: &str,
    message: &str,
    error: impl Display,
    debug_label: &str,
    debug_value: impl Debug,
) -> String {
    message_with_extra(
        function,
        message,
        error,
        debug_label,
        &format!("{:#?}", debug_value),
    )
}

/// Error message with a base64 bytes dump, to help debug MessagePack-related problems.
pub(crate) fn message_with_base64(
    function: &str,
    message: &str,
    error: impl Display,
    base64_label: &str,
    base64_bytes: impl AsRef<[u8]>,
) -> String {
    message_with_extra(
        function,
        message,
        error,
        base64_label,
        &base64::encode(base64_bytes),
    )
}

pub(crate) fn message_with_extra(
    function: &str,
    message: &str,
    error: impl Display,
    extra_label: &str,
    extra_value: &str,
) -> String {
    format!(
        "ERROR({}): {}\n( error = {} )\n[ {} = {} ]",
        function, message, error, extra_label, extra_value,
    )
}
