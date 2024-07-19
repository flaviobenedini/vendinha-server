import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from './entities/conta.entity';
import { CreateContaDto } from './dto/create-conta.dto';

@Injectable()
export class ContasRepository {
  constructor(
    @InjectRepository(Conta)
    private readonly repository: Repository<Conta>,
  ) {}

  findAll(): Promise<Conta[] | undefined> {
    return this.repository.find({
      relations: ['cliente'],
      order: { dataCriacao: 'DESC' },
    });
  }

  findTotalDividas(): Promise<number> {
    return this.repository
      .createQueryBuilder('conta')
      .select('SUM(conta.valor)', 'total')
      .where('conta.paga = false')
      .getRawOne()
      .then((result) => result.total);
  }

  findContasByStatus(status): Promise<Conta[] | undefined> {
    let paga = false;
    if (status === 'paga') paga = true;
    return this.repository.find({
      where: { paga },
      relations: ['cliente'],
      order: { dataCriacao: 'DESC' },
    });
  }

  save(createContaDto: CreateContaDto) {
    return this.repository.save(createContaDto);
  }

  pagar(id: number) {
    return this.repository.update(id, {
      paga: true,
      dataPagamento: new Date(),
    });
  }
}
