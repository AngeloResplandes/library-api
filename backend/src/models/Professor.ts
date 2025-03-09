import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/db"

export interface ProfessorInstance extends Model {
    idProfessor?: number
    nomeProfessor: string
    cpfProfessor: string
    celularProfessor: string
    emailProfessor: string
    departamento: string
}

export const Professor = sequelize.define<ProfessorInstance>("Professor", {
    idProfessor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeProfessor: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    cpfProfessor: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    celularProfessor: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    emailProfessor: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    departamento: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    tableName: "professor",
    timestamps: false,
})