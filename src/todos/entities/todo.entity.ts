import { User } from "../../users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list.entity";
import { Flag } from "./flag.entity";

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

    @ManyToMany(() => Flag, (flag) => flag.todos)
    flags: Flag[]
}
