/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import {
  Experience,
  ProfileDetails,
  Project,
  UpdateProjectRequest,
} from '@portfolio/models';
import { FirestoreHelper } from './helpers/firestore.helper';

@Injectable()
export class PortfolioService {
  PROFILE_DOCUMENT_ID = 'PSBSWXffl4fOX7twutrV';
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private firestoreHelper: FirestoreHelper) {}

  async getProfileDetails(): Promise<ProfileDetails | null> {
    return this.firestoreHelper.getDocument<ProfileDetails>(
      'profile',
      this.PROFILE_DOCUMENT_ID
    );
  }

  async getExperiences(): Promise<Experience[]> {
    return this.firestoreHelper.getCollection<Experience>('experiences');
  }

  async getProjects(): Promise<Project[]> {
    return this.firestoreHelper.getCollection<Project>('projects');
  }

  async getProjectById(projectId: string): Promise<Project> {
    return this.firestoreHelper.getDocument<Project>('projects', projectId);
  }

  async createProject(project: Omit<Project, 'id'>) {
    return (await this.firestoreHelper.createDocument<Omit<Project, 'id'>>(
      'projects',
      project
    )) as any;
  }

  async updateProject(id: string, req: UpdateProjectRequest) {
    const updatedProject: Partial<Project> = {};

    req.updateMasks.forEach((mask) => {
      if (mask === 'title') {
        updatedProject.title = req.project.title;
      }
      if (mask === 'shortDescription') {
        updatedProject.title = req.project.shortDescription;
      }
      if (mask === 'technologies') {
        updatedProject.technologies = req.project.technologies;
      }
      if (mask === 'tags') {
        updatedProject.tags = req.project.tags;
      }
      if (mask === 'imageUrl') {
        updatedProject.imageUrl = req.project.imageUrl;
      }
      if (mask === 'liveUrl') {
        updatedProject.liveUrl = req.project.liveUrl;
      }
      if (mask === 'sourceUrl') {
        updatedProject.sourceUrl = req.project.sourceUrl;
      }
      if (mask === 'readmeUrl') {
        updatedProject.readmeUrl = req.project.readmeUrl;
      }
      if (mask === 'name') {
        updatedProject.name = req.project.name;
      }
    });
    return await this.firestoreHelper.updateDocument<Omit<Project, 'id'>>(
      'projects',
      id,
      updatedProject
    );
  }

  // async populate(collectionName: string, data: any[]) {
  //   try {
  //     const batch = writeBatch(db);

  //     data.forEach((e) => {
  //       const docRef = doc(collection(db, collectionName));
  //       batch.set(docRef, e);
  //     });
  //     await batch.commit();
  //   } catch (e) {
  //     console.error('error', e);
  //   }
  // }

  //   async populate() {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'experiences'));
  //       querySnapshot.forEach(async (d) => {
  //         const experience = d.data() as Experience;

  //         if (experience.company === 'NICE') {
  //           experience.skills = [
  //             'angularjs',
  //             'angular',
  //             'karma',
  //             'protractor',
  //             'typescript',
  //             'scss',
  //             'nodejs',
  //             'eslint',
  //             'git',
  //             'java',
  //             'spring boot',
  //           ];
  //         }
  //         const docRef = doc(db, 'experiences', d.id);
  //         await updateDoc(docRef, { skills: experience.skills ?? [] });
  //       });
  //     } catch (e) {
  //       console.error('error', e);
  //     }
  //   }
  // }
}
