import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
// importacion de cors
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cuentaRoutes from './routes/cuentaRoutes.js';


const app = express();

app.use(express.json());
dotenv.config();
conectarDB();

// Configuracion de Cors

const whitelist = [process.env.frontend_uri];
const corOptions = {
    
    origin: function(origin, callback) {
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Error de Cors'));
        }
    }
};


app.use(cors(corOptions));



app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuentas', cuentaRoutes);

app.listen(process.env.PORT);
console.log(`Servidor en el puerto ${process.env.PORT}`);