import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column()
  author: string;

  @Column({ default: () => "GETDATE()" })
  date: Date;

  @Column({length: 'MAX'})
  content: string;
}