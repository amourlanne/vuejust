import { BeforeRemove, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("images")
export class Image {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @BeforeRemove()
  removeFile() {
    console.log("before remove");
  }
}
