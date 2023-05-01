import { DataTypes, Sequelize } from "sequelize";

let isInit = false;

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export const getUser = async () => {
  if (!isInit) {
    await User.sync();

    isInit = true;
  }
  return User;
};
