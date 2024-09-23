const { Level } = require('../src/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create table
  await Level.sync({ force: true });
  //insert data
  await Promise.all([
    Level.create({
      id: 1,
      deviceId: 'bd4bc0db-4279-4941-9808-20b2ee07aa39',
      rssiLevel: -75,
      // updatedAt:'2024-09-23T13:54:26.737Z'
    }),
    Level.create({
      id: 2,
      deviceId: '00e33520-7a46-4ab0-9e9d-4a602a49e876',
      rssiLevel: -25,
      // updatedAt:'2024-09-23T13:54:26.738Z'
    }),
  ]);
}
