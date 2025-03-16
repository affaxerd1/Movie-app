import { Client, Databases } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);
const database = new Databases(client);


export const updateSearchCount  =  async(searchtERM, MOVIE) => {
    //1. Use Appwrite SDK to check if searchterm exists in the DB
    try{

    }
    catch(error){
        
    }
   
    // 2. If it does update the count
    //3. if it doesnt create a new document with searchterm and count

     
}
