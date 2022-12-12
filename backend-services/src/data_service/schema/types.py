from typing import TypeAlias

from motor.motor_asyncio import AsyncIOMotorClient

"""
A database client instance.
"""
Client: TypeAlias = AsyncIOMotorClient
