import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Record {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: true })
    record: string;

    @Column({ type: "varchar" })
    status: string;

    @Column({ type: "varchar", nullable: true })
    file_name: string;

    @Column({ type: "varchar", nullable: true })
    file_data: string;

    @Column({ type: "varchar" })
    created: Date;

    @Column({ type: "varchar", nullable: true })
    updated: Date;

    @Column({ type: "varchar" })
    userId: string;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "id"
    })
    user_id: string;
}