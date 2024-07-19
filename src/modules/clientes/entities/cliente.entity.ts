import { Conta } from 'src/modules/contas/entities/conta.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ type: 'date' })
  nascimento: Date;

  @Column()
  email: string;

  @OneToMany(() => Conta, (conta) => conta.cliente)
  contas: Conta[];
}
