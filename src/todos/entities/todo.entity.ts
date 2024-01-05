import { User } from "../../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    text: string;

    @Column({nullable: true})
    deadline: Date;

    @ManyToOne(() => List, (list) => list.todos)
    list: List

    @ManyToOne(() => User)
    author: User
}
