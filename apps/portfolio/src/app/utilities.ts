import { marked } from 'marked';

export function convertToHtml(markdown: string) {
  return marked(markdown);
}

export const MASTER_SKILLS: Record<string, { title: string; color: string }> = {
  javascript: { title: 'JavaScript', color: '#f7df1e' },
  typescript: { title: 'TypeScript', color: '#3178c6' },
  html: { title: 'HTML5', color: '#e34c26' },
  css: { title: 'CSS3', color: '#264de4' },
  scss: { title: 'Sass/SCSS', color: '#c6538c' },
  react: { title: 'React', color: '#61dafb' },
  angular: { title: 'Angular', color: '#dd0031' },
  vue: { title: 'Vue.js', color: '#41b883' },
  nextjs: { title: 'Next.js', color: '#000000' },
  svelte: { title: 'Svelte', color: '#ff3e00' },
  redux: { title: 'Redux', color: '#764abc' },
  ngrx: { title: 'NgRx', color: '#b7178c' },
  rxjs: { title: 'RxJS', color: '#d81b60' },
  node: { title: 'Node.js', color: '#339933' },
  git: { title: 'Git', color: '#f05032' },
  webpack: { title: 'Webpack', color: '#8dd6f9' },
  docker: { title: 'Docker', color: '#2496ed' },
  firebase: { title: 'Firebase', color: '#ffca28' },
  nx: { title: 'Nx', color: '#143055' },
  tailwind: { title: 'Tailwind CSS', color: '#06b6d4' },
};

export const getDurationInYearsAndMonths = (startDate: number, endDate: number) => {
  if (endDate === 0) {
    endDate = new Date().getTime();
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
    years--;
    months += 12;
  }

  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      months = 11;
    }
  }

  return { years, months };
};
