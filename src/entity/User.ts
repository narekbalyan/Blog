import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    password: string;
}