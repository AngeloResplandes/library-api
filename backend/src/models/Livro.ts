import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/db"

export interface LivroInstance extends Model {
  idLivro?: number
  nomeLivro: string
  autorLivro: string
  editoraLivro: string
  anoLivro: Date
  generoLivro: string
}

export const Livro = sequelize.define<LivroInstance>("Livro", {
  idLivro: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeLivro: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  autorLivro: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  editoraLivro: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  anoLivro: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  generoLivro: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: "livro",
  timestamps: false,
})