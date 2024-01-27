// API indexedDB  JS

import { DatabaseError } from "@/ManagementErrors/Index";

import type { Goal } from "@/types";

let db: IDBDatabase | null = null;

const openDatabase = (): Promise<IDBDatabase> => {
  if (db) {
    return Promise.resolve(db);
  }

  return new Promise((resolve, reject) => {
    const IDBrequest = window.indexedDB.open('db_goals', 1);

    IDBrequest.onerror = function (event) {
      reject(new Error("Error al abrir la base de datos"));
    };

    IDBrequest.onupgradeneeded = function (event) {
      const upgradedDb = IDBrequest.result;
      upgradedDb.createObjectStore('goals', { keyPath: 'id' });
    };

    IDBrequest.onsuccess = function (event) {
      db = IDBrequest.result;
      resolve(db);
    };
  });
};

const getGoals = async (): Promise< Goal []> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('goals', 'readonly');
    const goals = transaction.objectStore('goals');

    const getAllRequest = goals.getAll();

    getAllRequest.onsuccess = function(event: Event ) {
      const request = event.target as IDBRequest
      const dataFound = request.result as Goal[]  
      resolve(dataFound);
    };

    getAllRequest.onerror = function(event: Event) {
      const request = event.target as IDBRequest

      console.error("Error al obtener los datos:", request?.error);
      new DatabaseError('Database crashed')
      reject(request?.error);
    };
  });
};

const addGoal = async(data: Goal): Promise <{ status: boolean }> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('goals', 'readwrite')
    const goals = transaction.objectStore("goals")
    goals.add(data)
    
    transaction.oncomplete = ((event) => {
      console.log('goal added');
      resolve({status: true});
    })
    transaction.onerror = ((event) => {
      console.log('goal not added');
        reject({status: false});
    })
  });
}
// const updateGoal = (data: Goal) => {

// }
const deleteGoal = async(id: string): Promise <{ status: boolean }> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('goals', 'readwrite')
    const goals = transaction.objectStore("goals")
    goals.delete(id)
    
    transaction.oncomplete = ((event) => {
      console.log('goal deleted');
      resolve({status: true});
    })
    transaction.onerror = ((event) => {
      console.log('goal not deleted');
        reject({status: false});
    })
  });

} 

export { addGoal, getGoals, deleteGoal  }



