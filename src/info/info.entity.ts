import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
@Entity('Infos')

export class Info {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: false })
	icon: string;

	@Column({ type: 'text', nullable: false })
	text: string;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({ type: 'text', nullable: false })
	href: string;

}
