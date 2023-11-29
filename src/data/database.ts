// src/data/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://tecker58_sergio:Infnet#2023@162.241.203.236:3306/tecker58_mystore2');

if(sequelize){
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
} else {
    console.error('Não foi possível conectar ao banco de dados!');
}

export default sequelize;