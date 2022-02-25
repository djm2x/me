import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('MyTests')

export class MyTest {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	data: string;
}