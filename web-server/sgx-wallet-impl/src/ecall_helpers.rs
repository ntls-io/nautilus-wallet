use std::panic;
use std::prelude::v1::String;

/// Like [`panic::catch_unwind`], but unwrap the panic message, if any.
pub fn catch_unwind_message<F, R>(f: F) -> Result<R, Option<String>>
where
    F: FnOnce() -> R + panic::UnwindSafe,
{
    panic::catch_unwind(f).map_err(|panic_value| {
        panic_value
            .downcast::<String>()
            .map(|boxed_message| *boxed_message)
            .ok()
    })
}
