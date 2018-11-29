import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get('getCats')
    @UseGuards(AuthGuard('jwt'))
    async getCats() {
        return await this.catsService.findAll();
    }
}