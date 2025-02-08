import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/db"
import { Livro } from "./Livro"

export interface ExemplarLivroInstance extends Model {
  idExemplar_Livro?: number;
  idLivro: number;
  numCodigo: string;
  status_livro: "Disponível" | "Emprestado" | "Reservado"
}

export const ExemplarLivro = sequelize.define<ExemplarLivroInstance>("ExemplarLivro", {
  idExemplar_Livro: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idLivro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Livro,
      key: "idLivro",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  numCodigo: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  status_livro: {
    type: DataTypes.ENUM("Disponível", "Emprestado", "Reservado"),
    allowNull: false,
    defaultValue: "Disponível",
  },
}, {
  tableName: "exemplar_livro",
  timestamps: false,
})