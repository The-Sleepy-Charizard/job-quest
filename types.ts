export type ServerError = {
    log: string,
    status: number, 
    message: {err: string},
  }

export type UserProp = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

export type NavProp = {
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export type DashProp = {
  username: string
}

export type EntryState = {
  position: string;
  company: string;
  salary: string;
  location: string;
  section: string;
  saveDate: string;
  applyDate: string;
  followDate: string;
  interest: string;
  job_id?: number;
  username?: string;
}

export type JobProps = {
    job: EntryState
}

export type JobContainerProps = {
    jobs: JobProps[];
  };
