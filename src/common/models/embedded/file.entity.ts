import { Column } from 'typeorm';

export class FileEmbedded {
  @Column({ type: 'varchar', nullable: true })
  url: string;

  @Column({ type: 'varchar', nullable: true })
  key: string;

  @Column({ type: 'varchar', nullable: true })
  fileName: string;
}
