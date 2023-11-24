import CartManager from "../dao/classes/cartManagerMongo.js";

const cartsService = new CartManager();

const getAllCarts = async (req, res) => {
    try {
        res.status(200).send({ status: "success", payload: await cartsService.getAll() });
    } catch (error) {
        res.status(404).send({ status: "Error", error: "Carritos no encontrados" });
    }
};

const getCartById = async (req, res) => {
    try {
        res.status(200).send({ status: "success", payload: await cartsService.getById(req.params.cid) });
    } catch (error) {
        res.status(404).send({ status: "Error", error: "Carrito no encontrado" });
    }
};

const addCart = async (req, res) => {
    await cartsService.add();
    res.status(201).send({ status: "success", payload: 'Carrito creado con exito' });
};

const addProductInCart = async (req, res) => {
    try {
        await cartsService.addProduct(req.params.cid, req.params.pid);
        res.status(200).send({ status: "success", payload: "Producto agregado con exito" });
    } catch (error) {
        res.status(404).send({ status: "Error", error: "Carrito o producto no encontrado" });
    }
};

const deleteProductInCart = async (req, res) => {
    try {
        await cartsService.deleteProduct(req.params.cid, req.params.pid);
        res.status(200).send({ status: "success", payload: 'Producto borrado con exito' });
    } catch (error) {
        res.status(404).send({ status: "Error", error: "Carrito o producto no encontrado" });
    }
};

const updateProduct = async (req, res) => {
    try {
        await cartsService.update(req.params.cid, req.params.pid, req.body.quantity);
        res.status(200).send({ status: "success", payload: "Producto actualizado con exito" });
    } catch (error) {
        res.status(400).send({ status: "Error", error: "Por favor ingrese solo números en la cantidad" });
    }
};

module.exports = {
    getAllCarts,
    getCartById,
    addCart,
    addProductInCart,
    deleteProductInCart,
    updateProduct,
};

