import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {
  CreateProjectResponse,
  GetExperiencesResponse,
  GetProfileDetailsResponse,
  GetProjectResponse,
  GetProjectsResponse,
  Project,
  UpdateProjectRequest,
} from '@portfolio/models';
import { MailService } from './mail.service';

@Controller()
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
    private mailService: MailService,
  ) {}

  @Get('/profile')
  public async getProfileDetails(): Promise<GetProfileDetailsResponse> {
    return {
      profile: await this.portfolioService.getProfileDetails(),
    };
  }

  @Get('/experiences')
  public async getExperiences(): Promise<GetExperiencesResponse> {
    return { experiences: await this.portfolioService.getExperiences() };
  }

  @Get('/projects')
  public async getProjects(): Promise<GetProjectsResponse> {
    return { projects: await this.portfolioService.getProjects() };
  }

  @Post('/project')
  public async createProject(
    @Body() request: Omit<Project, 'id'>
  ): Promise<CreateProjectResponse> {
    return {
      project: await this.portfolioService.createProject(request),
    };
  }

  @Get('/project/:id')
  public async getProjectById(
    @Param('id') id: string
  ): Promise<GetProjectResponse> {
    return {
      project: await this.portfolioService.getProjectById(id),
    };
  }

  @Patch('/project/:id')
  public async updateProject(
    @Param('id') id: string,
    @Body() request: UpdateProjectRequest
  ): Promise<any> {
    return {
      project: await this.portfolioService.updateProject(id, request),
    };
  }

  @Post('/sendEmail')
  async sendEmail(@Body() body: { name: string; email: string; message: string }) {
    await this.mailService.sendContactEmail(body.name, body.email, body.message);
    return { success: true, message: 'Email sent successfully' };
  }

  // @Get('/populate')
  // public async populate() {
  //   await this.portfolioService.populate();
  // }
}
