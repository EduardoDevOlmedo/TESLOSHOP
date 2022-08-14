import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
import { orderSizes } from '../../../utils/orderSizes'

type Data = 
|{message: string}
|IProduct[]
|IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'PUT':
            return updateProducts(req, res)
        case 'POST':
            return createProduct(req, res)
        default:
            return res.status(400).json({message: 'REQUEST METHOD NOT SUPPORTED BY THIS API.'})
    }


}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const products = await Product.find().lean().sort({title: 'asc'})

    await db.disconnect()

    //we must update images

    return res.status(200).json(products)

}
const updateProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

        const {_id = "", images = []} = req.body as IProduct;

        if( !isValidObjectId(_id)) {
            return res.status(400).json({message: 'ID NOT VALID.'})
        }

        if(images.length < 2){
            return res.status(400).json({message: 'You need at least 2 images'})
        }

        //EVALUAR SI LOCALHOST:3000/PRODUCTS/SDSDS.JPG      
        try {
            await db.connect()

            const product = await Product.findById(_id)

            if(!product) res.status(404).json({message: 'There is no product matching that ID'})

            // eliminar imagenes en cloudinary.

            let sizes = req.body.sizes;
            req.body.sizes = orderSizes(sizes)
            await product?.update(req.body)

            await db.disconnect()

            return res.status(200).json(product!)

        } catch (error) {
            await db.disconnect()
            console.error(error)
            return
        }

}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {images = []} = req.body as IProduct;

    if(images.length < 2){
        return res.status(406).json({message: 'Product needs at least two messages. '})
    }

    try {
        
        await db.connect()

        const productInDB = await Product.findOne({slug: req.body.slug});

        if(productInDB){
            return res.status(409).json({message: 'Product slug already exists. '})
        }

        const product = new Product(req.body)

        await product.save()

        await db.disconnect()

        res.status(201).json(product)

    } catch (error) {
        await db.disconnect()
        console.error(error)
        return res.status(400).json({message: 'Check the server logs. '})
    }

}

