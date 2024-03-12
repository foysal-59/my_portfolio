 // app.js
const  bodyParser=require('body-parser');
const compression=require('compression');
const cors=require('cors');
const express=require('express');
const helmet=require('helmet');
const mongoose =require('mongoose');
const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const  MONGODB_CONNECTION="mongodb+srv://nurnobifoysal59:nurnobifoysal@cluster0.z9cxt3s.mongodb.net/"
const Options={user:"",pass:"",autoIndex:true}
 
mongoose.connect(MONGODB_CONNECTION,Options)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.error("Database connection error:", err);
});


 
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

 



app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.use("*",(req,res)=>{
  res.status(404).json({data:"data not found"})
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
