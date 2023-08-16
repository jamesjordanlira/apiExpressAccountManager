import Cuenta from "../models/Cuenta.js";

const obtenerCuentas = async (req, res) => {
    const cuentas = await Cuenta.find().where('creador').equals(req.usuario);
    res.json(cuentas);
};

const nuevaCuenta = async (req, res) => {
    const cuenta = new Cuenta(req.body);
    
    cuenta.creador = req.usuario._id;

    try {
        const cuentaAlmacenada = await cuenta.save() 
        res.json(cuentaAlmacenada);
        
    } catch (error) {
        console.log(error);
    }
};

const obtenerCuenta = async (req, res) => {
    const { id } = req.params;
    
        const cuenta = await Cuenta.findById(id);
        if(!cuenta){
            const error = new Error('No encontrada');
            return res.status(404).json({msg: error.message});
        }

        if(cuenta.creador.toString()  !== req.usuario._id.toString()){
            const error = new Error('Acción no valida, no permitido');
            return res.status(401).json({msg: error.message})
            
        }

        res.json(cuenta);
    

};

const editarCuenta = async (req, res) => {
    
    const { id } = req.params;
    const cuenta = await Cuenta.findById(id);
    if(!cuenta){
        const error = new Error('No encontrada');
        return res.status(404).json({msg: error.message});
    }

    if(cuenta.creador.toString()  !== req.usuario._id.toString()){
        const error = new Error('Acción no valida, no permitido');
        return res.status(401).json({msg: error.message})
        
    }

    cuenta.nombre = req.body.nombre || cuenta.nombre;
    cuenta.email_telefono_redSocial = req.body.email_telefono_redSocial || cuenta.email_telefono_redSocial;
    cuenta.password = req.body.password || cuenta.password;

    try {
        const cuentaAlmacenada = await cuenta.save();
        res.json(cuentaAlmacenada);
        
    } catch (error) {
        console.log(error);
    }

};

const eliminarCuenta = async (req, res) => {
    const { id } = req.params;
    const cuenta = await Cuenta.findById(id);

    if(!cuenta){
        const error = new Error('No encontrada');
        res.status(404).json({msg: error.message});
    }

    if(cuenta.creador.toString()  !== req.usuario._id.toString()){
        const error = new Error('Acción no valida, no permitido');
        return res.status(401).json({msg: error.message})
        
    }

    try {
        await cuenta.deleteOne();
        res.json({msg: 'Cuenta Eliminada'});

    } catch (error) {
        console.log(error);
    }
};

export {
    obtenerCuentas,
    nuevaCuenta,
    obtenerCuenta,
    editarCuenta,
    eliminarCuenta
}