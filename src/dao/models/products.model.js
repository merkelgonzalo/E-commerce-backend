import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: String,
    price: {
        type: Number,
        require: true
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true,
        default: uuidv4().substring(0, 10)
    },
    stock: Number,
    category: {
        type: String,
        require: true
    },
    status: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);