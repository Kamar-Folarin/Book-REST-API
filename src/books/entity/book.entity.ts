import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', length: 60, nullable: false })
  title: string;

  @Column({ name: 'author', length: 60, nullable: false })
  author: string;

  @Column({ name: 'publishedDate', nullable: false })
  publishedDate: Date;
}
