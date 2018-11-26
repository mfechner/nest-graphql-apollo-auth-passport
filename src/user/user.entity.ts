import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string | undefined;

    @Column()
    passwordHash: string | undefined;
}
