const express = require('express');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const { requireAuth, checkUser } = require('./server/authMiddleware/authMiddleware');



const app = express();
const PORT = 4500 || process.env.PORT;



//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


// set view engine
app.set('view engine', 'ejs');

//DB config
const db ='mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/fxlites';
//connect to mongodb
mongoose.connect(db)
.then(()=>{
    console.log('MongoDB Connected')
})
.catch(err =>{console.log(err)})


// app.get('*', checkUser);
// app.use('/', requireAuth, require );
// app.use('/',requireAuth, userRoute);
// app.use('/', requireAuth, adminRoute);

app.get('*', checkUser);
app.use('/', require('./server/Route/indexRoute'));
app.use('/',requireAuth, require('./server/Route/userRoute'));
app.use('/', require('./server/Route/adminRoute'));


app.listen(PORT, console.log(`Server running on  ${PORT}`));


