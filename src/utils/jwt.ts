import jwt from 'jsonwebtoken';

export const validarJWT = (token: string) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET || 'secret';
        const usuario = jwt.verify(token, JWT_SECRET);
        return usuario;
    } catch (error) {
        return null;
    }
};

export const generarJWT = (usuario: any) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.sign(usuario, 
        JWT_SECRET,
        {expiresIn: '1d'});
};


export const obtenerUsuario = (token: string) => {
    const usuario = validarJWT(token);
    if (usuario === null) return null;
    if (typeof usuario === "object" && "id" in usuario) return usuario;
    return null;
};