const products =  [
    {
        id: 'pinkshirt',
        description: 'Pink Shirt',
        price: 42.12,
        reviews: [],
    },
    {
        id: 'bluejean',
        description: 'Blue Jeans',
        price: 55.55,
        reviews: [],
    }
];

function getAllProducts() {
    return products
}

function getProductsByPrice(min, max){
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    });
}

function getProductsByID(id) {
    return products.find((product) => {
        return product.id === id;
    });
}

function addNewproduct(id, description, price) {
    const newProduct = {
        id,
        price,
        description,
        reviews: [],
    }

    products.push(newProduct);
    return newProduct;
}

function addNewproductReview(id, rating, comment) {
    const matchedProduct = getProductsByID(id);

    if (matchedProduct) {
        const newProductReview = {
            rating,
            comment,
        }

    matchedProduct.reviews.push(newProductReview);

    return newProductReview
    }
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductsByID,
    addNewproduct,
    addNewproductReview,
}