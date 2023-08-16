import mongoose from 'mongoose';
const cuentaSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email_telefono_redSocial: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }

},
    {
        timestamps: true 
    },
);

const Cuenta = mongoose.model('Cuenta', cuentaSchema);
export default Cuenta;