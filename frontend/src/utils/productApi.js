import api from "./api";

const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getProductDetails = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { getProducts, getProductsByCategory, getProductDetails };