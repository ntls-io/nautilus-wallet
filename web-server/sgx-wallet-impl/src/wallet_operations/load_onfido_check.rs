use crate::schema::actions::{LoadOnfidoCheck, LoadOnfidoCheckResult};
use crate::wallet_operations::store::unlock_wallet;

pub fn load_onfido_check(request: &LoadOnfidoCheck) -> LoadOnfidoCheckResult {
    let stored = match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(stored) => stored,
        Err(err) => return err.into(),
    };

    stored.onfido_check_result.clone().map_or(
        LoadOnfidoCheckResult::NotFound,
        LoadOnfidoCheckResult::Loaded,
    )
}
