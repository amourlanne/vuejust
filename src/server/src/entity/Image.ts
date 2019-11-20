import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("images")
export class Image {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;
}
