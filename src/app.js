const express = require("express");
const app = express();

require("../src/db/conn");

const port = process.env.PORT || 8000;

app.use(express.json());

const Todomodel = require("../src/model/todoSchema")

app.get("/", (req, res) => {
    res.send("Hello form express ");
})

// insert Data in MongoDB
app.post("/todolist" , async (req,res) => {
    try{
        const insertData = new Todomodel(req.body);
        console.log(insertData);
        const result = await insertData.save()
        res.status(201).send(result);
    }catch(err){
        res.status(400).send(err);
    }
});

// get all data
app.get("/todolists", async (req , res) => {

    try{
        const Alldata = await Todomodel.find({});
        res.send(Alldata);
    }catch(err){
        res.status(404).send(err);
    }
})

// get single data using id
app.get("/todolist/:id", async (req , res) => {
    try{
        const _id = req.params.id;
        const singledata = await Todomodel.findById({_id});
        res.send(singledata);
    }catch(err){
        res.status(404).send(err);
    }
})

// Update data
app.patch("/todolist/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateData = await Todomodel.findByIdAndUpdate(_id, req.body , {
            new : true, useFindAndModify : false
        })
        res.send(updateData);
    }catch(err){
        res.status(500).send();
    }
})

// delete data 
app.delete("/todolist/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const deleteData = await Todomodel.findByIdAndDelete(_id)
        console.log(deleteData);
        res.send(deleteData)
    }catch(err){
        res.status(404).send(err);
    }
})

app.listen(port , () => {
    console.log(`App is Runing on => localhost://${port}`);
})