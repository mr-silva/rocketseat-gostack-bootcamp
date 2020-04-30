import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateIdColumnFromAppointment1588266126554
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('appointments', 'id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
      }),
    );
  }
}
