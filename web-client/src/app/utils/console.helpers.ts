/**
 * Console logging helpers.
 */

export const withConsoleGroup = async <R>(
  label: string,
  f: () => Promise<R>
): Promise<R> => {
  console.group(label);
  try {
    return await f();
  } finally {
    console.groupEnd();
  }
};

export const withConsoleTimer = async <R>(
  label: string,
  f: () => Promise<R>
): Promise<R> => {
  // eslint-disable-next-line no-console
  console.time(label);
  try {
    return await f();
  } finally {
    // eslint-disable-next-line no-console
    console.timeEnd(label);
  }
};

export const withLoggedExchange = async <Request, Response>(
  label: string,
  f: (request: Request) => Promise<Response>,
  request: Request
): Promise<Response> =>
  await withConsoleGroup(
    label,
    async () =>
      await withConsoleTimer('exchange', async () => {
        console.log('request:', request);
        const response = await f(request);
        console.log('response:', response);
        return response;
      })
  );
