import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '.';
import Team from './TeamModel';

export default class Match extends Model<InferAttributes<Match>, InferCreationAttributes<Match>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
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

Team.hasMany(Match, { foreignKey: 'home_team_id' as 'id' });
Team.hasMany(Match, { foreignKey: 'away_team_id' as 'id' });

Match.belongsTo(Team, { foreignKey: 'id' as 'home_team_id' });
Match.belongsTo(Team, { foreignKey: 'id' as 'away_team_id' });
