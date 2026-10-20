import cors from "cors"
import express from "express"
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';


const app = express();
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())


const client = new MongoClient(process.env.MONGODB_CONNECTION);
export async function connectionDB (){
    try{
      await client.connect()
        console.log(`the server is connected with the mongodb`);
        return client
    }
    catch(error){
        console.dir(error)
    }
}

const connectedDB = await connectionDB();
const db = connectedDB.db('fristserver')
const user = db.collection('user')

app.get('/user', async (req , res)=>{
    const cursor = user.find({})
    const allUser = await cursor.toArray();
    res.send(allUser)
})

app.get('/user/:id', async(req , res)=>{
    console.log(`requist for id `, req.params);
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    
    const singleresult = await user.findOne(query)
    res.send(singleresult)
})

app.delete('/user/:id' , async(req,res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)};
    const singleDelet = await user.deleteOne(query);
    res.send(singleDelet)
})

app.patch('/user/:id',  (req, res)=>{
    const id = req.params.id;
    const userUpdate = req.body;
    console.log(`this is the `, id ,` and thsi is the new change `, userUpdate);

    const filter = {
       _id:  new ObjectId(id)
    };
    const option = {upsert : true}
    const UpdatedDoc = {
        $set: {
            name: userUpdate.name ,
            email: userUpdate.email
        }
    }

    const result = user.updateOne(filter, UpdatedDoc , option)
    res.send(result)

})

app.post('/user', (req,res)=>{
    const data = req.body;
    console.log(data);

    const result = user.insertOne(data)
    res.send(result)
})
app.get('/', (req, res)=>{
    res.send('hay hay welcome to hublu gublo')
})

app.listen(PORT, ()=>{
    console.log(`the hublo server is running my dear port to ${PORT}`);
})