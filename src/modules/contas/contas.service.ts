import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContasRepository } from './contas.repository';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class ContasService {
  constructor(
    private readonly repository: ContasRepository,
    private readonly clienteService: ClientesService,
  ) {}

  async create(createContaDto: CreateContaDto) {
    try {
      const cliente = await this.clienteService.findOne(
        createContaDto.clienteId,
      );

      if (!cliente) {
        throw 'Cliente não encontrado';
      }

      const valordevedor = cliente.contas
        .map((conta) => {
          if (conta.paga === false) return conta.valor;
        })
        .reduce((acc, cur) => acc + cur, 0);

      if (valordevedor + createContaDto.valor > 200) {
        throw 'Valor da conta excede o limite de R$200,00';
      }

      createContaDto.dataCriacao = new Date();

      await this.repository.save(createContaDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Conta cadastrada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  findTotalDividas() {
    return this.repository.findTotalDividas();
  }

  findContasByStatus(status: string) {
    return this.repository.findContasByStatus(status);
  }

  async pagar(id: number) {
    try {
      if (!id) {
        throw 'Nenhuma conta foi informada';
      }
      await this.repository.pagar(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Conta marcada como paga',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} conta`;
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return `This action updates a #${id} conta`;
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
