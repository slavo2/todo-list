import { User } from "../../users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class List {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    owners: User[]

    @OneToMany(() => Todo, (todo) => todo.list)
    todos: Todo[]
}
