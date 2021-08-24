#!/usr/bin/env -S TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' npm exec ts-node

/* eslint-disable @typescript-eslint/naming-convention */

import {
  BenchmarkWalletService,
  doCreateWallet,
  doOpenWallet,
  doSignTransaction,
  prepareOpenWallet,
  prepareSignTransaction,
} from './service';

const bench = async ({
  concurrency,
  f,
}: {
  concurrency: number;
  f: (i: number) => Promise<unknown>;
}) => {
  const task = async (i: number): Promise<number> => {
    await f(i);
    return i;
  };
  const tasks: Promise<number>[] = Array.from(
    { length: concurrency },
    async (_, i) => task(i)
  );

  console.log('bench: warming up...');
  const warmupCount = concurrency * 3;
  for (let i = 0; i < warmupCount; i++) {
    const done: number = await Promise.race(tasks);
    tasks[done] = task(done);
  }
  console.log('bench: warmed up', warmupCount);

  // Hacky performance counter helper type
  type Counter = { count: number; readonly sinceWhen: number };
  const duration = (counter: Counter, now: number) => now - counter.sinceWhen;
  const rate = (counter: Counter, now: number) =>
    Math.round(counter.count / duration(counter, now));

  // Initial counters:
  const overall: Counter = { count: 0, sinceWhen: performance.now() / 1000 };
  let interval: Counter = { count: 0, sinceWhen: performance.now() / 1000 };

  while (true) {
    const done: number = await Promise.race(tasks);
    tasks[done] = task(done);

    // Update counters
    const whenUpdated = performance.now() / 1000;
    overall.count += 1;
    interval.count += 1;

    if (1 <= duration(interval, whenUpdated)) {
      // Report, and reset interval
      console.log(
        'bench:',
        { concurrency },
        rate(interval, whenUpdated),
        'per second',
        '(overall:',
        overall.count,
        'done,',
        rate(overall, whenUpdated),
        'per second)'
      );
      interval = { count: 0, sinceWhen: whenUpdated };
    }
  }
};

const benchEnclaveReport = async (
  service: BenchmarkWalletService
): Promise<void> => {
  console.log('bench: starting: getEnclaveReport');
  await bench({ concurrency: 256, f: (i) => service.getEnclaveReport() });
};

const benchCreateWallet = async (
  service: BenchmarkWalletService
): Promise<void> => {
  await service.saveEnclavePublicKey();
  console.log('bench: starting: CreateWallet');
  await bench({ concurrency: 128, f: (i) => doCreateWallet(service, i) });
};

const benchOpenWallet = async (
  service: BenchmarkWalletService
): Promise<void> => {
  await service.saveEnclavePublicKey();
  const { wallet_id } = await prepareOpenWallet(service);
  console.log('bench: starting: OpenWallet');
  await bench({ concurrency: 128, f: (i) => doOpenWallet(service, wallet_id) });
};

const benchSignTransaction = async (
  service: BenchmarkWalletService
): Promise<void> => {
  await service.saveEnclavePublicKey();
  const request = await prepareSignTransaction(service);
  console.log('bench: starting: SignTransaction');
  await bench({
    concurrency: 128,
    f: (i) => doSignTransaction(service, request),
  });
};

const main = async (): Promise<void> => {
  const service = new BenchmarkWalletService('http://ntls-demo.registree.io/');

  // await benchEnclaveReport(service);
  // await benchCreateWallet(service);
  // await benchOpenWallet(service);
  await benchSignTransaction(service);
};

main().catch(console.error);
