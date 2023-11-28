import { Request, Response } from 'express';
import Product from '../data/ProductModel';
import fileUpload from '../middlewares/fileUploadMiddleware'

export const createProduct = async (req: Request, res: Response):Promise<void> => {
    try {
        fileUpload.single('productImage')(req, res, async (err: any) =>{
            if(err){
                console.error('Erro ao fazer upload de imagem: ', err)
                res.status(500).json({error: 'Erro ao fazer upload de imagem'})
                return;
            }

            const { product_title, product_price, product_description, product_rate, product_count, category_id } = req.body;
            const product_image = req.file ? req.file.filename : ''; 

            //poderia fazer mais validações

            const newProduct = await Product.create({
                product_title, 
                product_price,
                product_description,
                product_rate,
                product_count,
                category_id,
                product_image,
            })
            res.status(201).json(newProduct);

        })
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getFilteredProducts = async (req: Request, res: Response):Promise<void> => {
    try {
        let categoryId = req.query.categoryId as string | undefined;
        let orderPrice = req.query.orderPrice as string | undefined;
        let rawPage = req.query.page as string | undefined;

        //paginação
        if(!rawPage || rawPage.trim() === ''){
            rawPage = '1';
        }

        const page = parseInt(rawPage as string, 10)

        if(isNaN(page) || page < 1) {
            res.status(400).json({error: 'Invalid page number'})
            return;
        }

        const limit = 5;
        let offset = (page - 1) * limit;

        //Filtragem por categoria
        const whereClause: { category_id?: number } = {};
        if(categoryId){
            whereClause.category_id = Number(categoryId);
        }

        //ordenacao preço
        let order: any;

        if(orderPrice === 'asc') {
            order = [['product_price', 'ASC']];
        } else if (orderPrice === 'desc') {
            order = [['product_price', 'DESC']];
        } else {
            order = [];
        }

        const {count, rows} = await Product.findAndCountAll({
            where: whereClause,
            order: order,
            limit: limit,
            offset: offset,
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            products: rows,
            totalPages: totalPages,
            currentPage: page,
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
}