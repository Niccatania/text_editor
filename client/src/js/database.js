import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const textDb = await openDB('jate', 1);
  const transact = textDb.transaction('jate', 'readwrite');
  const store = transact.objectStore('jate');
  const req = store.put({id:1, value:content });
  const res = await req;
  console.log(res.value); 
}

export const getDb = async () => { 
  const textDb = await openDB('jate', 1);
  const transact = textDb.transaction('jate', 'readwrite');
  const store = transact.objectStore('jate');
  const req = store.getAll();
  const res = await req;
console.log('res.value', res);
return res.value;
}

initdb();
