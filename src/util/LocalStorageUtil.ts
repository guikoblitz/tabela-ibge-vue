import localForage from 'localforage';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export default class Storage {
  dbPromise: Promise<LocalForage>;

  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      let db: LocalForage;

      const config = {
        name: 'tabelaIbge',
        storeName: 'tabelaIbge',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage'],
      };

      localForage
        .defineDriver(cordovaSQLiteDriver)
        .then(() => {
          db = localForage.createInstance(config);
        })
        .then(() => db.setDriver(this.getDriverOrder(config.driverOrder) as string[]))
        .then(() => {
          resolve(db);
        })
        .catch((reason) => reject(reason));
    });
  }

  ready() {
    return this.dbPromise;
  }

  getDriverOrder(driverOrder: string[]) {
    return driverOrder.map((driver: string) => {
      switch (driver) {
        case 'sqlite':
          return cordovaSQLiteDriver._driver;
        case 'indexeddb':
          return localForage.INDEXEDDB;
        case 'websql':
          return localForage.WEBSQL;
        case 'localstorage':
          return localForage.LOCALSTORAGE;
      }
    });
  }

  async get(key: string) {
    return this.dbPromise.then((db) => db.getItem(key));
  }

  async set(key: string, value: any) {
    return await this.dbPromise.then((db) => db.setItem(key, value));
  }

  async remove(key: string) {
    return await this.dbPromise.then((db) => db.removeItem(key));
  }

  async clear() {
    return await this.dbPromise.then((db) => db.clear());
  }
}
