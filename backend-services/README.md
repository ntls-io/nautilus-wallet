# Wallet Backend Services

An HTTP server backend for the Nautilus Wallet powered by [FastAPI][fastapi] and
the [uvicorn ASGI server][uvicorn].

- [Setup](#setup)
- [Quick Start](#quick-start)

[fastapi]: https://fastapi.tiangolo.com/
[uvicorn]: https://www.uvicorn.org/

## Setup

In order to proceed, one needs to have the `poetry` dependency management and
packaging tool installed. Unless a recent version is available via your OS
package manager, as it would be on Arch Linux and friends :), the recommended
means of installing `poetry` is via the well-established `pipx` tool as
described in [their documentation][pipx-install].

Once `pipx` is installed, installing `poetry` is as simple as

```shell
pipx install poetry
```

If you are simply looking for the API docs you may now skip ahead to the
[following section][#quick-start], you should also install the `pyenv` tool as
it is invaluable in managing your project-specific and shell-specific virtual
environments. This is again as simple as

```shell
pipx install pyenv
```

If you use `bash` as your shell then copy the following to your
`~/.bash_profile`, if it exists, or otherwise to `~/.profile`

```bash
# you may ignore this line if it is already set in your config
export XDG_DATA_HOME="$HOME/.local/share"

export PYENV_ROOT="$XDG_DATA_HOME/pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

and copy the same last line to your `~/.bashrc`

```bash
eval "$(pyenv init -)"
```

Make sure to log out (and back in of course) or, alternatively, restart your
machine. Once you are back in the `backend-services` sub-directory of the
project run

```shell
pyenv local 3.{10,11}
```

[pipx-install]: https://python-poetry.org/docs/#installation

## Quick Start

In the root of the Python project, where the `pyproject.toml` is located, run
the following command:

```shell
poetry install
```

Make sure the following environment variables have been set in your local `.env` file:

- `WALLET_DB_CONNECTION_STRING`
- `WALLET_DB_DATABASE_NAME`
- `WALLET_BOOKMARK_DB_COLLECTION_NAME`

For examples you may consult the [python-dotenv] documentation. Once this is done, a local instance of the server may be started on `localhost:8000` by running

```shell
poetry run uvicorn web_asgi.main:app
```

The **Swagger/OpenAPI documentation** for this server is now accessible via
[localhost][localhost-docs].

If you would like to run the tests for the project locally, simply invoke

```shell
poetry run tox
```

Note that `poetry` creates and keeps track of project-related `python` virtual
environments on your behalf via your IDE (an IDE plugin might be necessary) or
from the command line. Run

```shell
poetry env info
```

for details about available environments for your current project. If you would
like to spawn a shell inside the current `poetry` virtual environment this may
be done via

```shell
poetry shell
```

## Commands

It's recommended to run these code format commands before committing any changes to
ensure consistent code style across the project. This helps ensure consistent and
organized imports, making your code easier to read and maintain.
```shell
poetry run black src tests
poetry run isort src tests
```

[localhost-docs]: http://localhost:8000/docs
[python-dotenv]: https://github.com/theskumar/python-dotenv#getting-started
