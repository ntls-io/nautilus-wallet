#![no_std]
#![warn(unsafe_op_in_unsafe_fn)]

#[macro_use]
extern crate sgx_tstd as std;

pub mod ecalls;
pub mod ported;
