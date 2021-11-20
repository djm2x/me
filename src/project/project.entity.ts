import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('Projects')

export class Project {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	title: string;

	@Column({ type: 'date', nullable: false })
	date: Date;

	@Column({ type: 'text', nullable: false })
	description: string;

	@Column({ type: 'text', nullable: false })
	tech: string;

	@Column({ type: 'text', nullable: false })
	image: string;

	@Column({ type: 'text', nullable: false })
	url: string;

	@Column({ type: 'boolean', nullable: false })
	isPrivate: boolean;

	@Column({ type: 'text', nullable: false })
	git: string;

}
