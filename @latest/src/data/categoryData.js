import masterImage from '../assets/cardCategory/wedding-cat.jfif';

// Initialize categories from localStorage or use empty array if none exists
let categoryData = JSON.parse(localStorage.getItem('categories')) || [];

export const getAllCategories = () => {
    return categoryData;
};

export const addCategory = (category) => {
    categoryData.push(category);
    // Save to localStorage whenever we add a new category
    localStorage.setItem('categories', JSON.stringify(categoryData));
};

export const getCategoryById = (id) => {
    return categoryData.find(category => category.id === id);
};

export const updateCategory = (id, updatedCategory) => {
    const index = categoryData.findIndex(category => category.id === id);
    if (index !== -1) {
        categoryData[index] = { ...categoryData[index], ...updatedCategory };
        localStorage.setItem('categories', JSON.stringify(categoryData)); // Save changes
        return true;
    }
    return false;
};

export const deleteCategory = (id) => {
    const index = categoryData.findIndex(category => category.id === id);
    if (index !== -1) {
        categoryData.splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(categoryData)); // Save changes
        return true;
    }
    return false;
};

export { categoryData }; 