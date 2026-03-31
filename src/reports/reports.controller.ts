import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from '../Interceptors/serialize.Interceptors';
import { ReportDto } from './dto/report.dto';
import { ApprovedReportDto } from './dto/approve-report.dto';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  //
  constructor(private reportsService: ReportsService) {}

  // create reports
  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  //updating Report by Id
  @Patch('/:id')
  approveReport(@Param('id') id: number, @Body() body: ApprovedReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
