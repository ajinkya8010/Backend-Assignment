import express from "express";
import connectDB from "./mongoose/connection.js"
import cookieParser from "cookie-parser";
import cors from "cors" ;
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config({
    path: '../.env'
})


const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());


connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
}).catch((err)=>{
    console.log("MONGODB connection failed!!! ",err)
})




app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("Swagger Docs available at http://localhost:3001/api-docs");



app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);


app.use(errorHandler);