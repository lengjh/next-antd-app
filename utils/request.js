import "cross-fetch/polyfill";
// import fetch from 'cross-fetch';
import useSWR from "swr";

export const aw = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: true });
      console.log("timer", time);
    }, time);
  });
};

async function __sleep(timer) {
  return await aw(timer);
}

async function fetcher(path) {
  const res = await fetch(path);
  const json = await res.json();
  return json;
}

export const get = () => {
  return new Promise(() => {});
};
export const syncRequest = (path) => {
  return useSWR(path, fetcher);
};
export const sleep = (path) => {
  return useSWR(path, __sleep);
};

export default fetch;
