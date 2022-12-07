"""
Entry point for the Nautilus Wallet web server.
"""

from fastapi import FastAPI

from data_service.operations.dispatch import dispatch as data_service_dispatch
from data_service.schema.actions import Action as DataServiceAction
from data_service.schema.actions import Response as DataServiceResponse

app = FastAPI()


@app.post("/data", response_model=DataServiceResponse)
async def data(request: DataServiceAction) -> DataServiceResponse:
    return await data_service_dispatch(request)
