export const debounce = (func: Function, timeout: number = 300) => {
  let timer: any;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, timeout);
  };
};
