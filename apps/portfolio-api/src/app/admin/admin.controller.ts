import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('/projects/sync')
  public async syncAllProjects(@Query('excludeReadme') excludeReadme: string) {
    return this.adminService.syncAllProjects(excludeReadme === "true");
  }

  @Get('/project/sync/:name')
  public async syncProjects(
    @Param('name') projectName: string,
    @Query('excludeReadme') excludeReadme: string,
  ) {
    return this.adminService.syncProjectWithGithub(projectName, excludeReadme === "true");
  }
}
