import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';

import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from '../Interceptors/serialize.Interceptors';
import { ReportDto } from './dto/report.dto';
import { ApprovedReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  //
  constructor(private reportsService: ReportsService) {}

  //get All Reports for an admin
  @Get()
  getAllReports() {
    return this.reportsService.getAll();
  }

  // create reports
  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  //Get a specific report using query
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  //updating Report by Id
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApprovedReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
