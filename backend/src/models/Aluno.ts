import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/db"

export interface AlunoInstance extends Model {
  idAluno?: number
  nomeAluno: string
  cpfAluno: string
  numMatricula: number
  celularAluno: string
  emailAluno: string
}

export const Aluno = sequelize.define<AlunoInstance>("Aluno", {
  idAluno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeAluno: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  cpfAluno: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  numMatricula: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  celularAluno: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  emailAluno: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
},
  {
    tableName: "aluno",
    timestamps: false,
  })