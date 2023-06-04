import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Challenge } from "../challenges/entitys/Chalenge.entity";

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  lang: string;

  @Column()
  base: string;

  @Column()
  expected: string;

  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
