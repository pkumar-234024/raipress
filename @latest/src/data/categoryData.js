import masterImage from '../assets/cardCategory/wedding-cat.jfif';

export const categoryData = [
    {
        id: 1,
        name: "Furniture",
        description: "Modern and classic furniture for your home",
        image: "/images/categories/furniture.jpg"
    },
    {
        id: 2,
        name: "Electronics",
        description: "Latest electronic gadgets and devices",
        image: "/images/categories/electronics.jpg"
    },
    {
        id: 3,
        name: "Fashion",
        description: "Trendy clothing and accessories",
        image: "/images/categories/fashion.jpg"
    },
    {
        id: 4,
        name: "Marriage Cards",
        image: masterImage, // Add your image path
        description: "Beautiful and elegant marriage invitation cards with customizable designs",
        priceRange: "₹15 - ₹50 per card",
    },
    {
        id: 5,
        name: "Posters",
        image: masterImage,
        description: "High-quality posters for events, advertisements, and promotions",
        priceRange: "₹100 - ₹500",
    },
    {
        id: 6,
        name: "Visiting Cards",
        image: masterImage,
        description: "Professional business cards with modern designs",
        priceRange: "₹2 - ₹10 per card",
        
    },
    {
        id: 7,
        name: "Death Cards",
        image: masterImage,
        description: "Respectful and dignified death announcement cards",
        priceRange: "₹10 - ₹30 per card",
        
    }
]; 

// Helper functions for category management
export const addCategory = (category) => {
    categoryData.push(category);
};

export const getCategoryById = (id) => {
    return categoryData.find(category => category.id === id);
};

export const getAllCategories = () => {
    return categoryData;
};

export const updateCategory = (id, updatedCategory) => {
    const index = categoryData.findIndex(category => category.id === id);
    if (index !== -1) {
        categoryData[index] = { ...categoryData[index], ...updatedCategory };
        return true;
    }
    return false;
};

export const deleteCategory = (id) => {
    const index = categoryData.findIndex(category => category.id === id);
    if (index !== -1) {
        categoryData.splice(index, 1);
        return true;
    }
    return false;
}; 