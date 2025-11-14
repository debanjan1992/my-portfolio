import { Octokit } from 'octokit';
import * as dotenv from 'dotenv';

dotenv.config();

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
