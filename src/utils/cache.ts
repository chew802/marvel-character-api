import NodeCache from 'node-cache';

const cache = new NodeCache();

const set = (key, value) => {
  return cache.set(key, value)
}

const get = (key) => {
  return cache.get(key)
}
const has = (key) => {
  return cache.has(key)
}

export default {
  get,
  set,
  has
}