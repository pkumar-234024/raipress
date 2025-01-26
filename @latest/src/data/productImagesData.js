const API_URL = 'https://a6a5-2409-40e3-3013-5e8b-7056-2b3c-35a2-54a8.ngrok-free.app/ProductImages';

// Helper function to convert base64 to byte array
const base64ToByteArray = (base64String) => {
    const base64 = base64String.split(',')[1] || base64String;
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return Array.from(bytes);
};

// Get all images for a product
export const getProductImages = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/product/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product images');
        }
        const data = await response.json();
        return data.map(image => ({
            id: image.id,
            image: `data:image/jpeg;base64,${image.productsImage}`,
            productId: image.productId
        }));
    } catch (error) {
        console.error('Error fetching product images:', error);
        throw error;
    }
};

// Add a new image to a product
export const addProductImage = async (productId, imageData) => {
    try {
        const dataToSend = {
            Id: 0,
            ProductsImage: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
            ProductId: parseInt(productId)
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Create response error:', errorData);
            throw new Error('Failed to add product image');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding product image:', error);
        throw error;
    }
};

// Update an existing product image
export const updateProductImage = async (id, imageData, productId) => {
    try {
        const dataToSend = {
            Id: id,
            ProductsImage: imageData.split(',')[1],
            ProductId: parseInt(productId)
        };

        const response = await fetch(`${API_URL}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Update response error:', errorData);
            throw new Error('Failed to update product image');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product image:', error);
        throw error;
    }
};

// Delete a product image
export const deleteProductImage = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Delete response error:', errorData);
            throw new Error(`Failed to delete product image: ${JSON.stringify(errorData)}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting product image:', error);
        throw error;
    }
}; 