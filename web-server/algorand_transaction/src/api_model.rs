use crate::{
    transaction::{StateSchema, TransactionSignature},
    tx_group::TxGroup,
    SignedTransaction, Transaction, TransactionType,
};
use algorand_core::{
    Address, LogicSignature, MicroAlgos, MultisigSignature, Round, Signature, SignedLogic,
    ToMsgPack, VotePk, VrfPk,
};
use algorand_crypto::HashDigest;
use serde::{Serialize, Serializer};

// Important: When signing:
// - Fields have to be sorted alphabetically.
// - Keys must be excluded if they've no value.
// The signature validation fails otherwise.
#[derive(Debug, Serialize)]
pub struct ApiTransaction {
    #[serde(rename = "aamt", skip_serializing_if = "Option::is_none")]
    pub asset_amount: Option<u64>,

    #[serde(rename = "aclose", skip_serializing_if = "Option::is_none")]
    pub asset_close_to: Option<Address>,

    #[serde(rename = "afrz", skip_serializing_if = "Option::is_none")]
    pub frozen: Option<bool>,

    #[serde(rename = "amt", skip_serializing_if = "Option::is_none")]
    pub amount: Option<u64>,

    #[serde(rename = "apaa", skip_serializing_if = "Option::is_none")]
    pub app_arguments: Option<Vec<u8>>,

    #[serde(rename = "apan", skip_serializing_if = "Option::is_none")]
    pub on_complete: Option<u64>,

    #[serde(rename = "apap", skip_serializing_if = "Option::is_none")]
    pub approval_program: Option<Address>,

    #[serde(rename = "apar", skip_serializing_if = "Option::is_none")]
    pub asset_params: Option<ApiAssetParams>,

    #[serde(rename = "apas", skip_serializing_if = "Option::is_none")]
    pub foreign_assets: Option<Address>,

    #[serde(rename = "apat", skip_serializing_if = "Option::is_none")]
    pub accounts: Option<Vec<Address>>,

    #[serde(rename = "apfa", skip_serializing_if = "Option::is_none")]
    pub foreign_apps: Option<Address>,

    #[serde(rename = "apgs", skip_serializing_if = "Option::is_none")]
    pub global_state_schema: Option<ApiStateSchema>,

    #[serde(rename = "apid", skip_serializing_if = "Option::is_none")]
    pub app_id: Option<u64>,

    #[serde(rename = "apls", skip_serializing_if = "Option::is_none")]
    pub local_state_schema: Option<ApiStateSchema>,

    #[serde(rename = "apsu", skip_serializing_if = "Option::is_none")]
    pub clear_state_program: Option<Address>,

    #[serde(rename = "arcv", skip_serializing_if = "Option::is_none")]
    pub asset_receiver: Option<Address>,

    #[serde(rename = "asnd", skip_serializing_if = "Option::is_none")]
    pub asset_sender: Option<Address>,

    #[serde(rename = "caid", skip_serializing_if = "Option::is_none")]
    pub config_asset: Option<u64>,

    #[serde(rename = "close", skip_serializing_if = "Option::is_none")]
    pub close_reminder_to: Option<Address>,

    #[serde(rename = "fadd", skip_serializing_if = "Option::is_none")]
    pub freeze_account: Option<Address>,

    #[serde(rename = "faid", skip_serializing_if = "Option::is_none")]
    pub asset_id: Option<u64>,

    #[serde(rename = "fee")]
    pub fee: MicroAlgos,

    #[serde(rename = "fv")]
    pub first_valid: Round,

    #[serde(rename = "gen", skip_serializing_if = "Option::is_none")]
    pub genesis_id: Option<String>,

    #[serde(rename = "gh")]
    pub genesis_hash: HashDigest,

    #[serde(rename = "grp", skip_serializing_if = "Option::is_none")]
    pub group: Option<HashDigest>,

    #[serde(rename = "lv")]
    pub last_valid: Round,

    #[serde(rename = "lx", skip_serializing_if = "Option::is_none")]
    pub lease: Option<HashDigest>,

    #[serde(rename = "nonpart", skip_serializing_if = "Option::is_none")]
    pub nonparticipating: Option<bool>,

    #[serde(
        rename = "note",
        with = "serde_bytes",
        skip_serializing_if = "Option::is_none"
    )]
    pub note: Option<Vec<u8>>,

    #[serde(rename = "rcv", skip_serializing_if = "Option::is_none")]
    pub receiver: Option<Address>,

    #[serde(rename = "rekey", skip_serializing_if = "Option::is_none")]
    pub rekey_to: Option<Address>,

    #[serde(rename = "selkey", skip_serializing_if = "Option::is_none")]
    pub selection_pk: Option<VrfPk>,

    #[serde(rename = "snd")]
    pub sender: Address,

    #[serde(rename = "type")]
    pub type_: String,

    #[serde(rename = "votefst", skip_serializing_if = "Option::is_none")]
    pub vote_first: Option<Round>,

    #[serde(rename = "votekd", skip_serializing_if = "Option::is_none")]
    pub vote_key_dilution: Option<u64>,

    #[serde(rename = "votekey", skip_serializing_if = "Option::is_none")]
    pub vote_pk: Option<VotePk>,

    #[serde(rename = "votelst", skip_serializing_if = "Option::is_none")]
    pub vote_last: Option<Round>,

    #[serde(rename = "xaid", skip_serializing_if = "Option::is_none")]
    pub xfer: Option<u64>,
}

#[derive(Debug, PartialEq, Serialize)]
pub struct ApiAssetParams {
    #[serde(rename = "am", skip_serializing_if = "Option::is_none")]
    pub meta_data_hash: Option<Vec<u8>>,

    #[serde(rename = "an", skip_serializing_if = "Option::is_none")]
    pub asset_name: Option<String>,

    #[serde(rename = "au", skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,

    #[serde(rename = "c", skip_serializing_if = "Option::is_none")]
    pub clawback: Option<Address>,

    #[serde(rename = "dc")]
    pub decimals: u32,

    #[serde(rename = "df", skip_serializing)]
    pub default_frozen: bool,

    #[serde(rename = "f", skip_serializing_if = "Option::is_none")]
    pub freeze: Option<Address>,

    #[serde(rename = "m", skip_serializing_if = "Option::is_none")]
    pub manager: Option<Address>,

    #[serde(rename = "r", skip_serializing_if = "Option::is_none")]
    pub reserve: Option<Address>,

    #[serde(rename = "t")]
    pub total: u64,

    #[serde(rename = "un", skip_serializing_if = "Option::is_none")]
    pub unit_name: Option<String>,
}

impl From<Transaction> for ApiTransaction {
    fn from(t: Transaction) -> Self {
        let mut api_t = ApiTransaction {
            // Common fields
            fee: t.fee,
            first_valid: t.first_valid,
            genesis_id: Some(t.genesis_id),
            genesis_hash: t.genesis_hash,
            group: t.group,
            last_valid: t.last_valid,
            lease: t.lease,
            note: t.note,
            rekey_to: t.rekey_to,
            sender: t.sender,
            type_: to_api_transaction_type(&t.txn_type).to_owned(),
            ///////////////
            asset_amount: None,
            asset_close_to: None,
            frozen: None,
            amount: None,
            app_arguments: None,
            on_complete: None,
            approval_program: None,
            asset_params: None,
            foreign_assets: None,
            accounts: None,
            foreign_apps: None,
            global_state_schema: None,
            app_id: None,
            local_state_schema: None,
            clear_state_program: None,
            asset_receiver: None,
            asset_sender: None,
            config_asset: None,
            close_reminder_to: None,
            freeze_account: None,
            asset_id: None,
            receiver: None,
            selection_pk: None,
            vote_first: None,
            vote_key_dilution: None,
            vote_pk: None,
            vote_last: None,
            xfer: None,
            nonparticipating: None,
        };

        match &t.txn_type {
            TransactionType::Payment(payment) => {
                api_t.receiver = Some(payment.receiver);
                api_t.amount = Some(payment.amount.0);
                api_t.close_reminder_to = payment.close_remainder_to;
            }
        }
        api_t
    }
}

impl ToMsgPack for Transaction {}
impl ToMsgPack for TxGroup {}
impl ToMsgPack for SignedTransaction {}

/// Convenience to call to_msg_pack() directly on Transaction
impl Serialize for Transaction {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let api_transaction: ApiTransaction = self.to_owned().into();
        api_transaction.serialize(serializer)
    }
}

/// Convenience to call to_msg_pack() directly on SignedTransaction
impl Serialize for SignedTransaction {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let api_transaction: ApiSignedTransaction = self.to_owned().into();
        api_transaction.serialize(serializer)
    }
}

#[derive(Debug, Serialize)]
pub struct ApiSignedTransaction {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sig: Option<Signature>,

    #[serde(rename = "msig", skip_serializing_if = "Option::is_none")]
    pub msig: Option<MultisigSignature>,

    #[serde(rename = "lsig", skip_serializing_if = "Option::is_none")]
    pub lsig: Option<ApiSignedLogic>,

    #[serde(rename = "txn")]
    pub transaction: ApiTransaction,

    #[serde(skip)]
    pub transaction_id: String,
}

impl From<SignedTransaction> for ApiSignedTransaction {
    fn from(t: SignedTransaction) -> Self {
        let (sig, msig, lsig) = match t.sig {
            TransactionSignature::Single(sig) => (Some(sig), None, None),
            TransactionSignature::Multi(msig) => (None, Some(msig), None),
            TransactionSignature::Logic(lsig) => (None, None, Some(lsig)),
        };
        ApiSignedTransaction {
            sig,
            msig,
            lsig: lsig.map(|l| l.into()),
            transaction: t.transaction.into(),
            transaction_id: t.transaction_id,
        }
    }
}

fn to_api_transaction_type<'a>(type_: &TransactionType) -> &'a str {
    match type_ {
        TransactionType::Payment(_) => "pay",
    }
}

#[derive(Clone, Debug, Eq, PartialEq, Serialize)]
pub struct ApiStateSchema {
    #[serde(rename = "nui")]
    pub number_ints: u64,

    #[serde(rename = "nbs")]
    pub number_byteslices: u64,
}

impl From<StateSchema> for ApiStateSchema {
    fn from(state_schema: StateSchema) -> Self {
        ApiStateSchema {
            number_ints: state_schema.number_ints,
            number_byteslices: state_schema.number_byteslices,
        }
    }
}

#[derive(Debug)]
pub struct ApiSignedLogic {
    pub logic: Vec<u8>,
    pub sig: Option<Signature>,
    pub msig: Option<MultisigSignature>,
    pub args: Vec<Vec<u8>>,
}

impl From<SignedLogic> for ApiSignedLogic {
    fn from(s: SignedLogic) -> Self {
        let (sig, msig) = match s.sig {
            LogicSignature::ContractAccount => (None, None),
            LogicSignature::DelegatedSig(sig) => (Some(sig), None),
            LogicSignature::DelegatedMultiSig(msig) => (None, Some(msig)),
        };
        ApiSignedLogic {
            logic: s.logic.bytes,
            sig,
            msig,
            args: s.args,
        }
    }
}

impl Serialize for ApiSignedLogic {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        // For some reason SerializeStruct ends up serializing as an array, so this explicitly serializes as a map
        use serde::ser::SerializeMap;
        let mut state = serializer.serialize_map(Some(4))?;
        state.serialize_entry("l", &self.logic)?;
        state.serialize_entry("arg", &self.args)?;
        state.serialize_entry("sig", &self.sig)?;
        state.serialize_entry("msig", &self.msig)?;
        state.end()
    }
}
