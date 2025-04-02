/* ========================================== */
/* This is just a fake fetch utility to avoid */
/*  setting up a real backend */
/*  details are not important here */
/* ========================================== */
const getRandomDelay = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomError = (probability: number) => {
  return Math.random() < probability;
};

export const fakeFetch = <ReturnType>(
  callback: () => ReturnType,
  resource: string,
  withFakeError?: boolean,
): Promise<ReturnType> => {
  const start = Date.now();
  console.log(`>>> called - ${resource}`);

  return new Promise((resolve, reject) => {
    const randomDelayMs = getRandomDelay(300, 1000);
    const result = callback();

    setTimeout(() => {
      if (withFakeError && getRandomError(0.4)) {
        reject(new Error("Random error"));
      }

      resolve(result);

      console.log(
        `>>> completed - ${resource}`,
        { result },
        `for ${Date.now() - start}ms`,
      );
    }, randomDelayMs);
  });
};
