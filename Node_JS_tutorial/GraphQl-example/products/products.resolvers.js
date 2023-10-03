const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts(); //
        },
        productsByPrice: (_, args) => {
            return productsModel.getProductsByPrice(args.min, args.max);
        },
        product: (_, args) => {
            return productsModel.getProductsByID(args.id);
        }
    },
    Mutation: {
        addNewProduct: (_, args) => {
            return productsModel.addNewproduct(args.id, args.description, args.price);
        },
        addNewProductReivew: (_, args) => {
            return productsModel.addNewproductReview(args.id, args.rating, args.comment);
        }
    }
};