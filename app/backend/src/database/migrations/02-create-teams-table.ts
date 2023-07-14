import { QueryInterface, Model, DataTypes } from "sequelize";
import ITeam from "../../Interfaces/ITeam";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
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
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  }
}