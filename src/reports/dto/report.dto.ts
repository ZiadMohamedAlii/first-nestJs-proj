import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}

// this is going to be the last thing to be sent to
// users by controller as report 'report entity'
