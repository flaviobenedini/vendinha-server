import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteId: number;

  @Column()
  descricao: string;

  @Column({ type: 'float' })
  valor: number;

  @Column({ default: false })
  paga: boolean;

  @Column()
  dataCriacao: Date;

  @Column({
    nullable: true,
  })
  dataPagamento: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;
}
