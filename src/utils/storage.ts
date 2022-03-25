// eslint-disable-next-line @typescript-eslint/ban-types
type Val = {}

type StorageValues = {
  [key: string]: Val
}

export function setItem(key: string, object: StorageValues) {
  return localStorage.setItem(key, JSON.stringify(object));
}

export function getItem(key: string) {
  const lack = JSON.stringify({})

  return JSON.parse(localStorage.getItem(key) ?? lack)
}

/**
* Check if localStorage has an Item / exists with the give key
* @param key the key of the Item
*/
export function localStorageHasItem(key: string) {
  return localStorage.getItem(key) !== null;
}

export function remove(key: string) {
  return localStorage.removeItem(key)
}

export function removeAll() {
  return localStorage.clear()
}
