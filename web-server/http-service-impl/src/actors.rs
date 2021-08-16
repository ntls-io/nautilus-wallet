use actix::{Actor, Context, Handler, Message};
use sgx_types::{sgx_report_t, sgx_target_info_t, SgxResult};

use crate::traits::WalletEnclave;

/// This actor lets [`crate::resources`] interact with the wallet enclave.
pub(crate) struct WalletEnclaveActor {
    pub(crate) wallet_enclave: Box<dyn WalletEnclave>,
}

impl Actor for WalletEnclaveActor {
    type Context = Context<Self>;
}

pub(crate) struct CreateReportMessage {
    pub(crate) target_info: sgx_target_info_t,
}

impl Message for CreateReportMessage {
    type Result = SgxResult<SgxResult<(sgx_report_t, [u8; 32])>>;
}

impl Handler<CreateReportMessage> for WalletEnclaveActor {
    type Result = <CreateReportMessage as Message>::Result;

    fn handle(&mut self, msg: CreateReportMessage, _ctx: &mut Self::Context) -> Self::Result {
        self.wallet_enclave.create_report(msg.target_info)
    }
}

// TODO: WalletOperation
