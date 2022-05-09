import mongoose, {Schema, model, Model} from "mongoose"
import {IProduct} from "../interfaces"

const productShchema = new Schema({
    description: {type: String, required: true},
    images: [{type: String}],
    inStock: {type: Number, required: true, default: 0}, 
    price: {type: Number, required: true, default: 0},
    sizes: [{
        type: String,
        enum: {
            values: ['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    slug:  {type: String, required: true, unique: true},
    tags: [{type: String, required: true}],
    title: {type: String, required: true},
    type: {
        type: String,
        enum: {
            values: ['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tamaño válido'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['men','women','kid','unisex'],
            message: '{VALUE} no es un género válido'
        }
    }
}, {
    timestamps: true
})

const Product: Model<IProduct> = mongoose.models.Product || model("Product", productShchema)

export default Product;