import api from "./api";

const getCategoryProducts = async () => {
    try {
        const response = await api.get(`/categoryproducts`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getCategoryProducts };