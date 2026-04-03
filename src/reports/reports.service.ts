import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './reports.entity';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // getallReports
  getAll() {
    return this.repo.find();
  }

  //   create report
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  // update user
  async changeApproval(id: number, approved: boolean) {
    //
    // get Report by id
    const report = await this.repo.findOne({ where: { id } });

    // check if report is found
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    // change the report value
    report.approved = approved;

    // save value in db
    return this.repo.save(report);
  }

  // get estimate
  createEstimate(estimateDto: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('*')
        // .where('make =:make', { make: estimateDto.make })
        .getRawMany()
    );
  }
}
