type CachedKey = string | number;
const cachePromise = new Map<CachedKey, Promise<any>>();
const getCachePromise = (cacheKey: CachedKey) => {
  return cachePromise.get(cacheKey);
};

const setCachePromise = (cacheKey: CachedKey, promise: Promise<any>) => {
  cachePromise.set(cacheKey, promise);
  promise
    .then((d) => {
      cachePromise.delete(cacheKey);
      return d;
    })
    .catch(() => {
      cachePromise.delete(cacheKey);
    });
};

export { getCachePromise, setCachePromise };
