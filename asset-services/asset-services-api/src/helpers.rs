use std::net::SocketAddr;
use std::str::FromStr;
use std::{env, io};

pub fn bind_addr_from_env() -> io::Result<SocketAddr> {
    let value = match env::var("BIND_ADDR") {
        Err(env::VarError::NotPresent) => Ok("127.0.0.1:8081".to_string()),
        otherwise => otherwise,
    }
    .map_err(|var_err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("invalid BIND_ADDR: {}", var_err),
        )
    })?;
    SocketAddr::from_str(&value).map_err(|parse_err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("invalid BIND_ADDR value <{}>: {}", value, parse_err),
        )
    })
}
