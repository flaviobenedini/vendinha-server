import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateClienteDto,
  FindClienteDto,
  UpdateClienteDto,
} from './clientes.dto';
import { ClientesRepository } from './clientes.repository';
import { testaCPF } from 'src/utils/utils';

@Injectable()
export class ClientesService {
  constructor(private readonly repository: ClientesRepository) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cpfValid = testaCPF(createClienteDto.cpf);

      if (!cpfValid) {
        throw 'CPF inválido';
      }

      const existClient = await this.repository.findByCPF(createClienteDto.cpf);
      if (existClient) {
        throw 'CPF já cadastrado';
      }

      await this.repository.save(createClienteDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente cadastrado com sucesso',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    const clientes = await this.repository.findAll();
    const clientesComDivida = [];

    clientes.map((cliente) =>
      clientesComDivida.push({
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        email: cliente.email,
        nascimento: cliente.nascimento,
        contas: cliente.contas,
        divida: cliente.contas
          .filter((conta) => !conta.paga)
          .reduce((acc, conta) => acc + conta.valor, 0),
      }),
    );

    clientesComDivida.sort((a, b) => b.divida - a.divida);

    return clientesComDivida;
  }

  async findNomes() {
    const clientes = await this.repository.findAll();
    const clienteNomes = [];

    clientes.map((cliente) =>
      clienteNomes.push({
        value: cliente.id,
        label: cliente.nome,
      }),
    );

    return clienteNomes;
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.repository.findOne(id);

      if (!cliente) {
        throw 'Cliente não encontrado';
      }

      await this.repository.update(updateClienteDto, id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente alterado com sucesso',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async remove(id: number) {
    try {
      await this.repository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente removido com sucesso',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }
}
