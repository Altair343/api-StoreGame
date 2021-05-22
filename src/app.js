import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/initialSetup";

//inicializando
const app = express();
import('./database');
createRoles();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
var whitelist = ['http://localhost:3000', 'https://www.example.com']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

//app.use(cors(corsOptions));
app.use(cors());

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => res.redirect('/api'));
app.get('/api', (req, res) => res.status(200).json({
    data:
    {
        id: 'ch_1IrcNxKQ9Vem9yTMKrHUwggQ',
        object: 'charge',
        amount: 17900,
        amount_captured: 17900,
        amount_refunded: 0,
        application: null,
        application_fee: null,
        application_fee_amount: null,
        balance_transaction: 'txn_1IrcNyKQ9Vem9yTMoVb4BXDj',
        billing_details: {
            address: {
                city: null,
                country: null,
                line1: null,
                line2: null,
                postal_code: null,
                state: null
            },
            email: null,
            name: null,
            phone: null
        },
        calculated_statement_descriptor: 'Stripe',
        captured: true,
        created: 1621142369,
        currency: 'mxn',
        customer: 'cus_JUbb4EouX0ea2W',
        description: 'Borderlands 2',
        destination: null,
        dispute: null,
        disputed: false,
        failure_code: null,
        failure_message: null,
        fraud_details: {},
        invoice: null,
        livemode: false,
        metadata: {},
        on_behalf_of: null,
        order: null,
        outcome: {
            network_status: 'approved_by_network',
            reason: null,
            risk_level: 'normal',
            risk_score: 36,
            seller_message: 'Payment complete.',
            type: 'authorized'
        },
        paid: true,
        payment_intent: null,
        payment_method: 'card_1IrcNvKQ9Vem9yTMFElWxqFY',
        payment_method_details: {
            card: {
                brand: 'visa',
                checks: [Object],
                country: 'US',
                exp_month: 2,
                exp_year: 2030,
                fingerprint: '8o7jlHPG1nfxhCCD',
                funding: 'credit',
                installments: null,
                last4: '4242',
                network: 'visa',
                three_d_secure: null,
                wallet: null
            },
            type: 'card'
        },
        receipt_email: null,
        receipt_number: null,
        receipt_url: 'https://pay.stripe.com/receipts/acct_1IrX6tKQ9Vem9yTM/ch_1IrcNxKQ9Vem9yTMKrHUwggQ/rcpt_JUbb5ofe8hsAl4RE84RHKu6hUxPZ6Me',
        refunded: false,
        refunds: {
            object: 'list',
            data: [],
            has_more: false,
            total_count: 0,
            url: '/v1/charges/ch_1IrcNxKQ9Vem9yTMKrHUwggQ/refunds'
        },
        review: null,
        shipping: null,
        source: {
            id: 'card_1IrcNvKQ9Vem9yTMFElWxqFY',
            object: 'card',
            address_city: null,
            address_country: null,
            address_line1: null,
            address_line1_check: null,
            address_line2: null,
            address_state: null,
            address_zip: null,
            address_zip_check: null,
            brand: 'Visa',
            country: 'US',
            customer: 'cus_JUbb4EouX0ea2W',
            cvc_check: 'pass',
            dynamic_last4: null,
            exp_month: 2,
            exp_year: 2030,
            fingerprint: '8o7jlHPG1nfxhCCD',
            funding: 'credit',
            last4: '4242',
            metadata: {},
            name: null,
            tokenization_method: null
        },
        source_transfer: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: 'succeeded',
        transfer_data: null,
        transfer_group: null
    }

}));

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);


export default app;