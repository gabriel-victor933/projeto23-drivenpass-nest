import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private readonly prisma: PrismaService
    ){}

    @Get()
    @HealthCheck()
    check(){
        return this.health.check([
            () => this.http.pingCheck("application health", "http://localhost:3000/checkHealth")
        ]);

    }

    @Get("2")
    @HealthCheck()
    check2() {
        return this.health.check([
        ]);
    }

}
