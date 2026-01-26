import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

//
// entity is like model in express 'shape of data'
//

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user will be', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user will be', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('deleted user will be', this.id);
  }
}
