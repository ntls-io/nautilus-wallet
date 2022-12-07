from data_service.operations.bookmark import bookmarks, create_bookmark, delete_bookmark
from data_service.schema.actions import (
    Action,
    ActionMethod,
    CreateBookmark,
    DeleteBookmark,
    GetBookmarks,
    Response,
)


class MethodNotFound(Exception):
    """
    Exception raised when dispatch fails due to an undefined method request.
    """

    pass


async def dispatch(request: Action) -> Response:
    match request.method:  # noqa: E999
        case ActionMethod.CREATE_BOOKMARK:
            return await create_bookmark(CreateBookmark.parse_obj(request.params))
        case ActionMethod.DELETE_BOOKMARK:
            return await delete_bookmark(DeleteBookmark.parse_obj(request.params))
        case ActionMethod.GET_BOOKMARKS:
            return await bookmarks(GetBookmarks.parse_obj(request.params))
        case _:
            raise MethodNotFound
