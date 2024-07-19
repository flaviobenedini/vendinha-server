import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';

@Injectable()
export class ClientesRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  //   create(CreateNib: CreateNibDto) {
  //     return this.repository.create(CreateNib);
  //   }

  //   save(CreateNib: CreateNibDto) {
  //     return this.repository.save(CreateNib);
  //   }

  //   findByDescription(description: string): Promise<Nib | undefined> {
  //     return this.repository.findOne({
  //       relations: {
  //         nibTypes: true,
  //       },
  //       where: { description: description },
  //     });
  //   }

  create(cliente: CreateClienteDto) {
    return this.repository.create(cliente);
  }

  save(cliente: CreateClienteDto) {
    return this.repository.save(cliente);
  }

  update(cliente: UpdateClienteDto, id: number) {
    return this.repository.update(id, cliente);
  }

  findAll(): Promise<Cliente[] | undefined> {
    return this.repository.find({
      relations: ['contas'],
      order: { nome: 'ASC' },
    });
  }

  findOne(id: number): Promise<Cliente | undefined> {
    return this.repository.findOne({
      relations: ['contas'],
      where: { id },
      order: { contas: { dataCriacao: 'DESC' } },
    });
  }

  findByCPF(cpf: string): Promise<Cliente | undefined> {
    return this.repository.findOne({
      where: { cpf },
    });
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
