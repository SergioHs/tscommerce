import {DataTypes, Model} from 'sequelize';

class User extends Model {
    public user_id!: number;
    public user_email!: string;
    public user_username!: string;
    public user_password!: string;
    public user_name!: string;
    public user_phone!: string;
    public user_city!: string;
    public user_street!: string;
    public user_number!: number;
    public user_cep!: string; 
}

export default User;