import config from "../config";
import cloudinary from 'cloudinary';
import { unlink } from 'fs-extra';
import Product from "../models/Product";

cloudinary.config({
    cloud_name: config.CLUD_NAME,
    api_key: config.CLUD_KEY,
    api_secret: config.CLUD_SECRET
});


export const indexProduct = async (req, res) => {
    const products = await Product.find();
    return res.json(products);
};

export const storeProduct = async (req, res) => {

    try {
        const { title, description, price, categories } = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const newProduct = new Product({
            title,
            description,
            price,
            imgPublicId: result.public_id,
            imgURL: result.url,
            categories,
        });

        const productSaved = await newProduct.save();
        await unlink(req.file.path);
        res.status(201).json(productSaved);

    } catch (error) {
        return res.status(500).json(error);
    }
};

export const showProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (product !== null) {
            res.status(200).json(product);
        } else {
            res.status(404).json('no se encontro el recurso');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateProduct = async (req, res) => {

    try {
        const { productId } = req.params;
        const { title, description, price, categories } = req.body;

        const product = await Product.findById(productId);

        if (product !== null) {
            await cloudinary.v2.uploader.destroy(product.imgPublicId);
            const result = await cloudinary.v2.uploader.upload(req.file.path);

            let productNew = {
                title,
                description,
                price,
                imgURL: result.url,
                categories,
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                productNew,
                {
                    new: true,
                }
            );
            await unlink(req.file.path);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json('no se encontro el recurso');
        }
    } catch (error) {
        return res.status(500).json(error);
    }




};

export const destroyProduct = async (req, res) => {

    try {
        const { productId } = req.params;
        const destroyProdcut = await Product.findByIdAndDelete(productId);
        if (destroyProdcut !== null) {
            await cloudinary.v2.uploader.destroy(destroyProdcut.imgPublicId);
            res.status(200).json(destroyProdcut);
        } else {
            res.status(404).json('no se encontro el recurso');
        }
    } catch (error) {
        return res.status(500).json(error);

    }

};