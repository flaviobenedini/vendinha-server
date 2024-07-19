import { PartialType } from '@nestjs/mapped-types';
import { Conta } from '../contas/entities/conta.entity';

export class CreateClienteDto {
  nome: string;
  cpf: string;
  email: string;
  nascimento: Date;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  nome?: string;
  email?: string;
  nascimento?: Date;
}

export class FindClienteDto {
  nome: string;
  cpf: string;
  email: string;
  nascimento: Date;
  contas: Conta[];
  divida: number;
}
