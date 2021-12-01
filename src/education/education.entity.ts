import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Educations')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    period: string;

    @Column('text')
    dipolma: string;

    @Column('text')
    universite: string;

    // @ManyToOne(type => User, va => va.parcours)
    // user: User;
}