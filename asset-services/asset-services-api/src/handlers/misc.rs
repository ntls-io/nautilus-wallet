use std::sync::Arc;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::tasks;
use axum::extract;

use crate::errors::CeleryErrorResponse;

pub async fn ping(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
) -> Result<String, CeleryErrorResponse> {
    let sent = celery
        .send_task(tasks::ping::new("ping".to_string()))
        .await?;
    Ok(sent.task_id)
}
