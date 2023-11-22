// src/data/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:root@localhost:3306/mystore');

if(sequelize){
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
} else {
    console.error('Não foi possível conectar ao banco de dados!');
}

export default sequelize;