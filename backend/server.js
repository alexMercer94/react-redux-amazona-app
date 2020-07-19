import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import productRoute from './routes/productRoute';
import userRoute from './routes/userRoute';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
/* app.get('/api/products', (req, res) => {
    res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find((x) => x._id === productId);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});
 */
app.listen(5003, () => {
    console.log(`Server started at http://localhost:5003`);
});
