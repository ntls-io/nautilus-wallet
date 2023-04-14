from pytest_mock import MockerFixture


def patch_mongo_client(mocker: MockerFixture) -> None:
    mocker.patch("motor.motor_asyncio.AsyncIOMotorClient")
