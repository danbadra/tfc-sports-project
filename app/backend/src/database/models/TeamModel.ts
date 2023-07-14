import { 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes, 
  Model 
} from "sequelize";
import db from '.';

export default class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: number;
  declare team_name: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});
