import { CuestionarioRepositoryImpl } from "../../../infrastructure/repositories/cuestionario/cuestionarioRepositoryImpl";
import { Request, Response } from 'express';


export class PreguntaValidator {
    private cuestionarioRepository : CuestionarioRepositoryImpl;

    constructor(
        cuestionarioRepository: CuestionarioRepositoryImpl
    ) {
        this.cuestionarioRepository = cuestionarioRepository;
    }

    async validatePregunta(
        body: any,
        is_inner_op: boolean = false,
        index?: number
    ): Promise<{ valid: boolean; message?: string }> {
        const { enunciado, orden, cuestionario_id, opciones } = body;

        if (!enunciado || enunciado.trim() === '') {
            return { valid: false, message: `El enunciado ${index !== undefined ? `de la pregunta ${index} ` : ''}no puede estar vacío.` };
        }

        if (orden === undefined || orden === null || !Number.isInteger(orden)) {
            return { valid: false, message: `El orden ${index !== undefined ? `de la pregunta ${index} ` : ''}debe ser un número entero.` };
        }

        if (!is_inner_op) {
            if (cuestionario_id === undefined || cuestionario_id === null || !Number.isInteger(cuestionario_id)) {
                return { valid: false, message: 'El cuestionario debe ser un número entero.' };
            }

            const cuestionario = await this.cuestionarioRepository.findById(cuestionario_id);
            if (!cuestionario) {
                return { valid: false, message: 'Cuestionario no encontrado' };
            }
        }

        if (!opciones || opciones.length === 0) {
            return { valid: false, message: 'Las opciones no pueden estar vacías.' };
        }

        if (opciones.some((opcion: any) => !opcion.texto || opcion.texto.trim() === '')) {
            return { valid: false, message: 'El texto de las opciones no puede estar vacío.' };
        }

        if (opciones.some((opcion: any) => opcion.es_correcta === undefined)) {
            return { valid: false, message: 'Las opciones deben tener un valor de es_correcta.' };
        }

        if (opciones.length < 2) {
            return { valid: false, message: 'La pregunta debe tener al menos dos opciones.' };
        }

        if (!opciones.some((opcion: any) => opcion.es_correcta)) {
            return { valid: false, message: 'Al menos una opción debe ser correcta.' };
        }

        if (opciones.filter((opcion: any) => opcion.es_correcta).length > 1) {
            return { valid: false, message: 'Solo una opción puede ser correcta.' };
        }

        return { valid: true };


        // // Validación: Nombre no puede estar vacío
        // if (!enunciado || enunciado.trim() === '') {
        //     res.status(400).json({ 
        //         message: `El enunciado ${index !== undefined ? `de la pregunta ${index}` : ''} no puede estar vacío.`
        //     });
        //     return false;
        // }

        // // Validación: Orden no puede estar vacío
        // if (orden === undefined || orden === null) {
        //     res.status(400).json({ 
        //         message: `El orden ${index !== undefined ? `de la pregunta ${index}` : ''} no puede estar vacío.`
        //     });
        //     return false;
        // }

        // if (!Number.isInteger(orden)) {
        //     res.status(400).json({ 
        //         message: `El orden ${index !== undefined ? `de la pregunta ${index}` : ''} debe ser un número entero.`
        //     });
        //     return false;
        // }

        // if (!is_inner_op) {
        //     // Validación: Cuestionario no puede estar vacío
        //     if (cuestionario_id === undefined || cuestionario_id === null) {
        //         res.status(400).json({ message: 'El id del cuestionario no puede estar vacío.' });
        //         return false;
        //     }

        //     if (!Number.isInteger(cuestionario_id)) {
        //         res.status(400).json({ message: 'El cuestionario debe ser un número entero.' });
        //         return false;
        //     }

        //     const cuestionario = await this.cuestionarioRepository.findById(cuestionario_id);
        //     if (!cuestionario) {
        //         res.status(404).json({ message: 'Cuestionario no encontrado' });
        //         return false;
        //     }
        // }

        // // Validación: Opciones no pueden estar vacías
        // if (!opciones || opciones.length === 0) {
        //     res.status(400).json({ message: 'Las opciones no pueden estar vacías.' });
        //     return false;
        // }

        // if (opciones.some((opcion: any) => !opcion.texto || opcion.texto.trim() === '')) {
        //     res.status(400).json({ message: 'El texto de las opciones no puede estar vacío.' });
        //     return false;
        // }

        // if (opciones.some((opcion: any) => opcion.es_correcta === undefined)) {
        //     res.status(400).json({ message: 'Las opciones deben tener un valor de es_correcta.' });
        //     return false;
        // }

        // if (opciones.length < 2) {
        //     res.status(400).json({ message: 'La pregunta debe tener al menos dos opciones.' });
        //     return false;
        // }

        // if (!opciones.some((opcion: any) => opcion.es_correcta)) {
        //     res.status(400).json({ message: 'Al menos una opción debe ser correcta.' });
        //     return false;
        // }

        // if (opciones.filter((opcion: any) => opcion.es_correcta).length > 1) {
        //     res.status(400).json({ message: 'Solo una opción puede ser correcta.' });
        //     return false;
        // }

        // return true;
    }

    async ValidatePreguntas(
        preguntas: any[],
    ): Promise<{ valid: boolean; message?: string }> {
        if (!preguntas || preguntas.length === 0) {
            return { valid: false, message: 'El cuestionario debe tener al menos una pregunta.' };
        }

        for (let i = 0; i < preguntas.length; i++) {
            const result = await this.validatePregunta(
                preguntas[i], 
                true,
                i + 1
            );
            if (!result.valid) {
                return result;
            }
        }

        return { valid: true };

        // let is_preguntas_valid = true;
        // await Promise.all(preguntas.map(async (pregunta: any, index: number) => {
        //     if (!is_preguntas_valid) return;

        //     if (!await this.validatePregunta(pregunta, res, true, index)) {
        //         is_preguntas_valid = false;
        //     }
        //     console.log(is_preguntas_valid);
        // }));

        // return is_preguntas_valid;
    }
}