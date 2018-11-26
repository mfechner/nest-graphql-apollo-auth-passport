import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('/api/cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    async getCats() {
        return await this.catsService.findAll();
    }
}