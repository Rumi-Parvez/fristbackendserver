import cors from "cors"
import express from "express"
import 'dotenv/config'
import { MongoClient } from 'mongodb';


const app = express();
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())


const client = new MongoClient(process.env.MONGODB_CONNECTION);
export async function connectionDB (){
    try{
       const connection = await client.connect()
        console.log(`the server is connected with the mongodb`);
        return connection
    }
    catch(error){
        console.dir(error)
    }
}

await connectionDB();




app.get('/', (req, res)=>{
    res.send('hay hay welcome to hublu gublo')
})

app.listen(PORT, ()=>{
    console.log(`the hublo server is running my dear port to ${PORT}`);
})