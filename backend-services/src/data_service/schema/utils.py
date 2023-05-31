def valid_hex_representation(cls: type, v: str) -> str:
    int(v, 16)
    if len(v) != 24:
        raise AssertionError(
            f"expected a 24 character hexadecimal string but '{v}' has length {len(v)}"
        )
    return v
