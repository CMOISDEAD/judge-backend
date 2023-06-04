import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Challenge } from "../challenges/entitys/Chalenge.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;

  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
