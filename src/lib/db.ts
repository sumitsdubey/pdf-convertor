import { log } from "console";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string

if(!MONGODB_URI){
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable');
      }
}


async function connectDB() {
    await mongoose.connect(MONGODB_URI, {
        dbName: 'jpg-to-pdf-app',
        bufferCommands: false,
      }).then((mongoose) => {
        log("Db Connection Success")
      }).catch((err)=>{
        log(`Error in connection DB ${err}`)
      });
}
  
 
  
  export default connectDB;