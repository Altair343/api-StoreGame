import config from "../config";
import Stripe from 'stripe';
import Product from "../models/Product";
import Payment from "../models/Payment";
import * as Serial from "../libs/Serial";

const stripe = new Stripe(config.STRIPE_SECRET);

/**
 * Manejar una solicitud de pago de un producto.
 *
 * @param  \req.body [ paymentMethod, idProduct  ]
 * @param  \req [ userId, userEmail ]
 * @return \json [ object ]
 *
 */

export const paymentProduct = async (req, res) => {
    try {
        const { paymentMethod, idProduct } = req.body;
        const userId = req.userId;
        const userEmail = req.userEmail;

        const product = await Product.findById(idProduct);

        if (product !== null) {
            const costo = product.price * 100;

            // Creamos el comprador
            const customer = await stripe.customers.create({
                email: userEmail,
                source: paymentMethod.tokenId
            })

            // Hacemos el pago
            const charge = await stripe.charges.create({
                amount: costo,
                currency: 'mxn',
                description: product.title,
                customer: customer.id
            })

            // Sacamos el monto del pago
            const amountCharge = (charge.amount / 100);

            // Generamos el serial del game
            const serialGame = "" + Serial.SerialRandom();

            // Creamos un objeto con datos del pago
            const newPayment = new Payment({
                paymentId: charge.id,
                userId,
                ProductId: product._id,
                receiptUrl: charge.receipt_url,
                amount: amountCharge,
                serialGame: serialGame,
            });

            // Guardamos el pago
            const paymentSaved = await newPayment.save();

            //Actualizamos el producto el campo sales
            let newsles = product.sales + 1;
            let productNew = {
                sales: newsles
            }
            await Product.findByIdAndUpdate(idProduct, productNew);

            // Respondemos la petición
            res.status(201).json({
                response: true,
                message: "The payment has been created",
                data: paymentSaved
            });

        } else {
            res.status(404).json({
                response: false,
                message: "The purchase could not be made, an error occurred with the product",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

/**
 * Manejar una solicitud de busqueda de la bilioteca del usuario.
 *
 * @param  \req [ userId ]
 * @return \json [ object ]
 *
 */

export const libraryUser = async (req, res) => {
    try {
        const userId = req.userId;
        const library = await Payment.find({ "userId": userId }).populate(
            "ProductId"
        );

        if (library !== null) {
            if (library.length > 0) {
                res.status(200).json({
                    response: true,
                    message: "The library was found",
                    data: library
                });
            } else {
                res.status(404).json({
                    response: false,
                    message: "The library was not found",
                });
            }

        } else {
            res.status(404).json({
                response: false,
                message: "The library was not found",
            });
        }

    } catch (error) {
        res.status(404).json({
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};

