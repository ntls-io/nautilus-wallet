FROM python:3.10-slim-bullseye

RUN useradd user --create-home --uid 1000


WORKDIR /var/app
RUN chown user:user .

COPY --chown=user . .

USER user
ENV PATH="/home/user/.local/bin:${PATH}"
RUN pip install -U pip pipx && pipx install poetry
# install runtime dependencies only
RUN touch README.md && poetry install

CMD poetry run gunicorn web_asgi.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
