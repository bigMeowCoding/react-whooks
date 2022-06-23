const ajaxGet = (num = 20, ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, ms);
  });
};
export default ajaxGet;
