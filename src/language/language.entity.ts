import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('Languages')

export class Language {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	lang: string;

	@Column({ type: 'text', nullable: false })
	level: string;

}
