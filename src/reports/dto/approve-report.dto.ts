import { IsBoolean } from 'class-validator';

export class ApprovedReportDto {
  @IsBoolean()
  approved: boolean;
}

// this class to check the for the approved property to update
