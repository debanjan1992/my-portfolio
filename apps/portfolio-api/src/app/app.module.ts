import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

import { FirestoreHelper } from './helpers/firestore.helper';
import { AdminService } from './admin/admin.service';
import { GithubHelper } from './helpers/github.helper';
import { AdminController } from './admin/admin.controller';
import { MailService } from './mail.service';

@Module({
  imports: [],
  controllers: [PortfolioController, AdminController],
  providers: [AdminService, MailService, PortfolioService, FirestoreHelper, GithubHelper],
})
export class AppModule {}
