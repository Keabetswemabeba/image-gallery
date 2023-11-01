import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'GalleryAppDB.db',
    location: 'default',
  },
  () => {},
  (error) => {
    console.error('Error opening database: ', error);
  }
);

// table to store image metadata
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, imagePath TEXT, latitude REAL, longitude REAL, createdAt TEXT)'
  );
});

export function insertImage(imagePath, latitude, longitude, createdAt) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO images (imagePath, latitude, longitude, createdAt) VALUES (?, ?, ?, ?)',
        [imagePath, latitude, longitude, createdAt],
        (tx, results) => {
          resolve(results.insertId);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export function getAllImages() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM images',
        [],
        (tx, results) => {
          const len = results.rows.length;
          const images = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            images.push(row);
          }
          resolve(images);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}



export default db;
