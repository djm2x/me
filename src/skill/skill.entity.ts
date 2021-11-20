import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('Skills')

export class Skill {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	domaine: string;

}
