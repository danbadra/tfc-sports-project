import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

export default class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'home_team_id' as 'id' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'away_team_id' as 'id' });

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'id' as 'home_team_id' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'id' as 'away_team_id' });