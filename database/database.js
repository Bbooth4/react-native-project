import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);

const db = new PouchDB('lists', {
  adapter: 'asyncstorage',
  deterministic_revs: false
});

export default db;
