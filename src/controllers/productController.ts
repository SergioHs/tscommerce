import { Request, Response } from 'express';
import Product from '../data/ProductModel';
import { off } from 'process';

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