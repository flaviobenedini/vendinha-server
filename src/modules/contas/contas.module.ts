import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { ContasRepository } from './contas.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './entities/conta.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conta]), ClientesModule],
  controllers: [ContasController],
  providers: [ContasService, ContasRepository],
  exports: [ContasService],
})
export class ContasModule {}
