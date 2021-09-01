import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}