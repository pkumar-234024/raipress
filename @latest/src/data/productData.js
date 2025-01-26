import masterImage from '../assets/weddingcard/images.jfif';

// Initialize products from localStorage or use empty array if none exists
let productData = JSON.parse(localStorage.getItem('products')) || [];

export const getAllProducts = () => {
    return productData;
};

export const addProduct = (product) => {
    productData.push(product);
    localStorage.setItem('products', JSON.stringify(productData));
};

export const getProductById = (id) => {
    return productData.find(product => product.id === id);
};

export const updateProduct = (id, updatedProduct) => {
    const index = productData.findIndex(product => product.id === id);
    if (index !== -1) {
        productData[index] = { ...productData[index], ...updatedProduct };
        localStorage.setItem('products', JSON.stringify(productData));
        return true;
    }
    return false;
};

export const deleteProduct = (id) => {
    const index = productData.findIndex(product => product.id === id);
    if (index !== -1) {
        productData.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(productData));
        return true;
    }
    return false;
};

export const addProductImages = (productId, newImages) => {
    const index = productData.findIndex(product => product.id === productId);
    if (index !== -1) {
        productData[index].images = [...productData[index].images, ...newImages];
        localStorage.setItem('products', JSON.stringify(productData));
        return true;
    }
    return false;
};

export const deleteProductImage = (productId, imageIndex) => {
    const index = productData.findIndex(product => product.id === productId);
    if (index !== -1) {
        productData[index].images.splice(imageIndex, 1);
        localStorage.setItem('products', JSON.stringify(productData));
        return true;
    }
    return false;
};

export { productData };