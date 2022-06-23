type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {};
const trigger = (key: string, data: any) => {
  if (listeners[key]) {
    listeners[key].forEach((listener) => listener(data));
  }
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);
  return function unSubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
};

export { subscribe, trigger };
