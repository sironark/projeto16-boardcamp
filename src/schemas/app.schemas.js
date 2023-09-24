import Joi from "joi";


export const postCustomersSchema = Joi.object({
        name: Joi.string().required().min(1),
        phone: Joi.string().regex(/^\d+$/).required().max(11).min(10),
        cpf: Joi.string().length(11).required().regex(/^\d+$/),
        birthday: Joi.date().max('now').iso()
    })

export const postGameSchema = Joi.object({
        name: Joi.string().required().min(1),
        stockTotal: Joi.number().required(),
        pricePerDay: Joi.number().required(),
        image: Joi.string().required()
    })