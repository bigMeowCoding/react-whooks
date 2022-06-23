type CachedKey = string | number;
type Timer = ReturnType<typeof setTimeout>;

export interface CachedData<TData = any, TParams = any> {
  data: TData;
  params: TParams;
  time: number;
}
interface RecordData extends CachedData {
  timer: Timer | undefined;
}
const cache = new Map<CachedKey, RecordData>();

const getCache = (key: CachedKey) => {
  return cache.get(key);
};

const setCache = (
  key: CachedKey,
  cacheTime: number,
  cachedData: CachedData,
) => {
  const currentCached = cache.get(key);
  if (currentCached?.timer) {
    clearTimeout(currentCached.timer);
  }
  let timer: Timer | undefined;
  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }
  cache.set(key, {
    ...cachedData,
    timer,
  });
};
const clearCache = (key: CachedKey) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => {
      cache.delete(cacheKey);
    });
  } else {
    cache.clear();
  }
};

export { clearCache, setCache, getCache };
