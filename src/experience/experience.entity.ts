import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('Experiences')

export class Experience {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	period: string;

	@Column({ type: 'text', nullable: false })
	societe: string;

	@Column({ type: 'text', nullable: false })
	job: string;

	@Column({ type: 'text', nullable: false })
	task: string;

	@Column({ type: 'text', nullable: false })
	tech: string;

	@Column({ type: 'text', nullable: false })
	links: string;

}
