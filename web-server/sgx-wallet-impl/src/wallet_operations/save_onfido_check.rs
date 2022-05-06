use crate::schema::actions::{SaveOnfidoCheck, SaveOnfidoCheckResult};
use crate::wallet_operations::store::{mutate_wallet, unlock_wallet};

pub fn save_onfido_check(request: &SaveOnfidoCheck) -> SaveOnfidoCheckResult {
    let stored = match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(ok) => ok,
        Err(err) => return err.into(),
    };

    match mutate_wallet(&stored.wallet_id, |mut stored| {
        // FIXME: Avoid mut?
        stored.onfido_check_result = Some(request.check.clone());
        stored
    }) {
        Ok(ok) => ok,
        Err(err) => return err.into(),
    }
    .expect("save_onfido_check: wallet disappeared!");

    SaveOnfidoCheckResult::Saved
}
