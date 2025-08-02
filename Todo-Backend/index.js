const express = require("express")
const {createTodo,updateTodo} = require("./Types")
const {todo} = require("./db")
const app = express()

app.use(express.json())

app.post("/Todo",(req,res)=>{
    const todoBody = req.body
    const result = createTodo.safeParse(todoBody)
    if(!result.success){
        res.status(411).json({
            msg : "Invalid Input"
        })
        return
    }
// try to just dump the entire todoBody
    todo.create({
        title : todoBody.title,
        description : todoBody.description,
        completed : false
    }).then(()=>{
        res.json({
            msg : "Todo added successfully."
        })
    })
})

app.get("/Todos",(req,res)=>{
    todo.find().then(response=> {
        res.json({response})
    })
})

app.put("/Completed",(req,res)=> {
    const todoId = req.body
    const result = updateTodo.safeParse(todoId)
    if(!result.success){
        res.status(411).json({
            msg : "Invalid Input"
        })
        return
    }

    todo.updateOne({
        _id : todoId.id
    },{
        $set: {completed : true}
    }).then(()=> {
        res.json({
            msg : "Updated Successfully."
        })
    })
})

app.listen(3000)