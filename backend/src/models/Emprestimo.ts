import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/db"
import { Aluno } from "./Aluno"
import { Professor } from "./Professor"
import { ExemplarLivro } from "./ExemplarLivro"

export interface EmprestimoInstance extends Model {
    idEmprestimo?: number
    idAluno?: number
    idProfessor?: number
    idExemplar_Livro: number
    dataInit: Date
    dateEntrega: Date
    status: "Em aberto" | "Devolvido" | "Atrasado"
}

export const Emprestimo = sequelize.define<EmprestimoInstance>("Emprestimo", {
    idEmprestimo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idAluno: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Aluno,
            key: "idAluno",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    idProfessor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Professor,
            key: "idProfessor",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    idExemplar_Livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: ExemplarLivro,
            key: "idExemplar_Livro",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    dataInit: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dateEntrega: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Em aberto", "Devolvido", "Atrasado"),
        allowNull: false,
        defaultValue: "Em aberto",
    },
}, {
    tableName: "emprestimo",
    timestamps: false,
})