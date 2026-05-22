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

export { getProducts };