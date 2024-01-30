// API indexedDB  JS

import { DatabaseError, RequestError } from "@/ManagementErrors/Index";

import type { Goal } from "@/types";
interface Response {
  message: string,
}

let db: IDBDatabase | null = null;

const openDatabase = (): Promise<IDBDatabase> => {
  if (db) {
    return Promise.resolve(db);
  }

  return new Promise((resolve, reject) => {
    const IDBrequest = window.indexedDB.open('db_goals', 1);

    IDBrequest.onerror = function (event) {
      reject( new DatabaseError('error connecting to the database'));
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

const closeDatabase = () => {
  if (db) {
    db.close();
    db = null;
  }
};

// De moemnto esta comnetado los errores ya que no entran ahi no se que aa que se deba

const getGoalsS = async (): Promise< Goal []> => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['goals'], 'readonly');
    const goals = transaction.objectStore('goals');

    const getAllRequest = goals.getAll();    

    getAllRequest.onsuccess = function(event: Event ) {
      const request = event.target as IDBRequest
      const dataFound = request.result as Goal[]        
      resolve(dataFound);
    };
    // getAllRequest.onerror = function(event: Event ) {            
    //   reject(new RequestError('Error fetching data from database'));
    // };
  });
};

const addGoal = async(data: Goal): Promise <Response> => {
  // console.log(data);
  
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('goals', 'readwrite')
    const goals =  transaction.objectStore("goals")
    const request = goals.add(data)
    
    request.onsuccess = () => {      
      resolve({ message: 'goal created' })
    }
    request.onerror = ()=> {      
      reject(new DatabaseError('Error creating goal'));
    }
  })
}
// const updateGoal = (data: Goal) => {

// }
const deleteGoal = async(id: string): Promise <Response> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('goals', 'readwrite')
    const goals = transaction.objectStore("goals")
    const request = goals.delete(id)
    
    request.onsuccess = ((event) => {      
      resolve({ message: 'goal deleted'});
    })
    request.onerror = ((event) => {
      reject(new RequestError('Error creating role'));
    })
  });

} 

export { addGoal, getGoalsS, deleteGoal  }



