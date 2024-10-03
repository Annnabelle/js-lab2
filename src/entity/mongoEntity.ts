import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class MongoEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  data!: string;

  @Column()
  createdAt!: Date;
}
