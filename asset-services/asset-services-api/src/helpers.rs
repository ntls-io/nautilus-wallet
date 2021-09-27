use std::io;
use std::net::SocketAddr;
use std::str::FromStr;

use env_var_helpers::env_vars;

pub fn bind_addr_from_env() -> io::Result<SocketAddr> {
    let value = env_vars::var_default("BIND_ADDR", "127.0.0.1:8081")?;
    SocketAddr::from_str(&value).map_err(|parse_err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("invalid BIND_ADDR value <{}>: {}", value, parse_err),
        )
    })
}
