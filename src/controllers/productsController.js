import config from "../config";
import cloudinary from 'cloudinary';
import { unlink } from 'fs-extra';
import Product from "../models/Product";
import Payment from "../models/Payment";

cloudinary.config({
    cloud_name: config.CLUD_NAME,
    api_key: config.CLUD_KEY,
    api_secret: config.CLUD_SECRET
});

/**
 * Manejar una solicitud de busqueda de todos los productos.
 *
 * @return \json [ object ]
 *
 */

export const indexProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            response: true,
            message: "The products was found",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de todos las ordenes.
 *
 * @return \json [ object ]
 *
 */

export const listOrders = async (req, res) => {
    try {
        const orders = await Payment.find().populate("ProductId");
        res.status(200).json({
            response: true,
            message: "The products was found",
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};


/**
 * Manejar una solicitud de registro entrante de un producto.
 *
 * @param  \req.body [title, description, price, categories ]
 * @return \json [ object ]
 *
 */

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
            sales: 0,
        });

        const productSaved = await newProduct.save();
        await unlink(req.file.path);

        res.status(201).json({
            response: true,
            message: "The product has been created",
            data: productSaved
        });

    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de un producto.
 *
 * @param  \req.params [ productId ]
 * @return \json [ object ]
 *
 */

export const showProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (product !== null) {
            res.status(200).json({
                response: true,
                message: "The product was found",
                data: product
            });
        } else {
            res.status(404).json({
                response: false,
                message: "The product was not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de los productos que pertenescan a una categoria
 *
 * @param  \req.params [ categoryName ]
 * @return \json [ object ]
 *
 */

export const showCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        //const product = await Product.findById(categoryName);
        const product = await Product.find({ "categories": categoryName });

        if (product !== null) {
            if (product.length > 0) {
                res.status(200).json({
                    response: true,
                    message: "The category was found",
                    data: product
                });
            } else {
                res.status(404).json({
                    response: false,
                    message: "The category was not found",
                });
            }

        } else {
            res.status(404).json({
                response: false,
                message: "The category was not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de los productos mas vendidos
 *
 * @param  \req.params [ shop ]
 * @return \json [ object ]
 *
 */

export const showProductSales = async (req, res) => {
    try {
        const { shop } = req.params;
        const product = await Product.find().limit(parseInt(shop)).sort({ "sales": -1, "_id": -1 });

        //.limit(shop);
        //.sort({ sales: 1 });

        res.status(200).json({
            response: true,
            message: "The products was found",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de actualización entrante de un producto.
 *
 * @param  \req.params [ productId ]
 * @param  \req.body [ title, description, price, categories ]
 * @return \json [ object]
 *
 */

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
            res.status(200).json({
                response: true,
                message: "The product has been updated",
                data: updatedProduct
            });

        } else {
            await unlink(req.file.path);
            res.status(404).json({
                response: false,
                message: "The product was not found",
            });
        }

    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }




};

/**
 * Manejar una solicitud de eliminación de un producto.
 *
 * @param  \req.params [ productId ]
 * @return \json [ object ]
 *
 */

export const destroyProduct = async (req, res) => {

    try {
        const { productId } = req.params;
        const destroyProdcut = await Product.findByIdAndDelete(productId);
        if (destroyProdcut !== null) {
            await cloudinary.v2.uploader.destroy(destroyProdcut.imgPublicId);
            res.status(200).json({
                response: true,
                message: "The product has been removed",
                data: destroyProdcut
            });

        } else {
            res.status(404).json({
                response: false,
                message: "The product was not found",
            });
        }

    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de uno o mas productos
 *
 * @param  \req.body [ word ]
 * @return \json [ object ]
 *
 */

export const search = async (req, res) => {
    try {
        let { word } = req.body;
        let er = new RegExp(`.*${word}.*`, 'i');
        const productSearch = await Product.find({ "title": er });

        if (productSearch !== null) {
            if (productSearch.length > 0) {
                console.log(productSearch);
                res.status(200).json({
                    response: true,
                    message: "The game was found",
                    data: productSearch
                });
            } else {
                res.status(404).json({
                    response: false,
                    message: "The game was not found",
                });
            }

        } else {
            res.status(404).json({
                response: false,
                message: "The game was not found",
            });
        }

    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};
