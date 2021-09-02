import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Users')
export class User {
    
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column({ type: 'varchar' }) 
    username: string;

    @Column({ type: 'varchar', nullable: true }) 
    imageUrl: string;
    
    @Column({ type: 'varchar', nullable: false }) 
    password: string;
    
    @Column({ type: 'varchar', nullable: false, unique: true }) 
    email: string;

    @Column({ type: 'varchar', nullable: false }) 
    role: string;

    @Column('boolean')
    isActive: boolean;
    
    @CreateDateColumn() 
    createdOn?: Date;
    
    @CreateDateColumn() 
    updatedOn?: Date;

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}
