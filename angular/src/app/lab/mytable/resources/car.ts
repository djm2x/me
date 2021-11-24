import { Column, Entity } from '../decorators/column';


@Entity({popup: false, serviceName: ''})
export class Car {

  id: number;

  @Column({ order: 0, canSort: false})
  maker: string;

  @Column({ order: 1, canSort: true})
  model: string;

  @Column({ canSort: true, canFilter: true})
  year: number;
}



