export async function openDB(dbName: string, version: number, stores: { [key: string]: string }) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, version)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      for (const [storeName, keyPath] of Object.entries(stores)) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath })
        }
      }
    }
  })
}

export async function addData(db: IDBDatabase, storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.add(data)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function getData(db: IDBDatabase, storeName: string, key: any) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function updateData(db: IDBDatabase, storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.put(data)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

