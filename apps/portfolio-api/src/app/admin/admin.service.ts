import { Injectable } from '@nestjs/common';
import { FirestoreHelper } from '../helpers/firestore.helper';
import { Project } from '@portfolio/models';
import { GithubHelper } from '../helpers/github.helper';
import { PortfolioService } from '../portfolio.service';

@Injectable()
export class AdminService {
  constructor(
    private firestoreHelper: FirestoreHelper,
    private githubHelper: GithubHelper,
    private portfolioService: PortfolioService
  ) {}

  async syncProjectWithGithub(name: string, excludeReadme: boolean) {
    try {
      console.log('Syncing project: ', name);
      const projectInDB =
        await this.firestoreHelper.getDocumentByProperty<Project>(
          'projects',
          'name',
          name
        );

      const projectInGithub = (await this.githubHelper.getRepoDetails(name))
        .data;
      const languages = (await this.githubHelper.getRepoLanguages(name)).data;
      const tags = (await this.githubHelper.getRepoTags(name)).data;

      projectInDB.private = projectInGithub.private;
      projectInDB.defaultBranch = projectInGithub.default_branch;
      projectInDB.size = projectInGithub.size;
      projectInDB.sourceUrl = projectInGithub.html_url;
      projectInDB.languages = languages;
      projectInDB.tags = tags.map((tag) => tag.name);

      projectInDB.createdAt = projectInGithub.created_at;
      projectInDB.updatedAt = projectInGithub.updated_at;
      projectInDB.pushedAt = projectInGithub.pushed_at;

      if (!excludeReadme) {
        const readme = (await this.githubHelper.getReadmeForRepo(name)).data;
        projectInDB.readmeUrl = readme.download_url;
      }

      await this.firestoreHelper.updateDocument<Project>(
        'projects',
        projectInDB.id,
        projectInDB
      );

      return projectInDB;
    } catch (e) {
      console.error('Error syncing project: ', name, e);
      return null;
    }
  }

  async syncAllProjects(excludeReadme: boolean) {
    const projects = await this.firestoreHelper.getCollection<Project>(
      'projects'
    );
    const responses: Project[] = [];
    console.log('Total projects to sync: ', projects.length);
    for (const project of projects) {
      const updatedProject = await this.syncProjectWithGithub(
        project.name,
        excludeReadme
      );
      if (updatedProject) {
        responses.push(updatedProject);
      } else {
      }
    }
    console.log('Total projects synced successfully: ', responses.length);
    console.log(
      'Total projects failed to sync: ',
      projects.length - responses.length
    );

    return responses;
  }
}
