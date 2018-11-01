import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);

const db = new PouchDB('lists', {
  adapter: 'asyncstorage',
  deterministic_revs: false
});

// document that tells PouchDB/CouchDB
// to build up an index on doc.name
const ddoc = {
  _id: 'by_user_id',
  views: {
    by_user_id: {
      map: doc => {
        emit(doc.user_id).toString();
      }
    }
  }
};

// save it
// db.put(ddoc).then(() => console.log('success'))
// .catch(err => console.log('failed', err));

export default db;
