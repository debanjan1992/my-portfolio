import { Injectable } from '@nestjs/common';
import { octokit } from '../config/github';

@Injectable()
export class GithubHelper {
  owner = 'debanjan1992';

  getRepoDetails(repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}', {
      owner: this.owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  getRepoLanguages(repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: this.owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  getRepoTags(repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}/tags', {
      owner: this.owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  getReadmeForRepo(repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}/contents/README.md', {
      owner: this.owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  getUserProfile() {
    return octokit.request('GET /users/{owner}', {
      owner: this.owner,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }
}
