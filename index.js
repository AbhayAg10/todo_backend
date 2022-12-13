const express=require('express');
const fs=require('fs');
const cors=require('cors');

 const dbFile=fs.readFileSync(`${__dirname}/./db.json`,{encoding:"utf-8"})
 const db=JSON.parse(dbFile)
let todo=db.todo
  const ubpdatedb=(updatedData)=>{
      fs.writeFileSync(`${__dirname}/./db.json`,JSON.stringify(updatedData),{encoding:"utf-8"})
  }
const app = express();  //create server
app.use(express.json()) //allow to read json body
app.use(cors())
app.listen(8080,()=>{
    console.log('Listening on port 8080');
})
app.use(express.static(`${__dirname}/../public`))
const htmlFile=fs.readFileSync(`${__dirname}/../public/./todo.html`,{encoding: 'utf8'})

app.get('/', (req, res)=>{
   res.send(todo)
  // res.send(htmlFile)
   }
)

 
 app.delete('/:id', (req, res)=>{
    let {id}=req.params
    let index=todo.findIndex(p=>p.id==id)
    todo.splice(index,1)
    ubpdatedb({...db,todo})
    res.send("Data updated correctly") 
     }
  )
  app.post("/",(req, res)=>{
  todo.push({
        ...req.body,
        id:todo.length+1})
        ubpdatedb({...db,todo})
    res.send("Data updated correctly")
  })
  
  app.put('/:id', (req, res)=>{
    let count=0

    let {id}=req.params
    todo=todo.map((p)=>{
        if(p.id==id){
            return{
                ...p,
                ...req.body
            }
            }else{
              count++;
              return p
            }
    })
    if(count==todo.length){
      todo=[...todo,{...req.body,id:Number(id)}]
    }
    //res.send(products) 
    ubpdatedb({...db,todo})
    res.send("Data updated correctly") 
     }
  )