use celery::task::TaskResult;

#[celery::task]
pub fn ping(value: String) -> TaskResult<String> {
    Ok(value)
}
