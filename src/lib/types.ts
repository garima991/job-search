
export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employment_type: string;
  job_type: string;
  company_id: string;
};


export interface Company {
  id: string;
  name: string;
  description: string;
}

