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
  saveDate: string | undefined;
  applyDate: string | undefined;
  followDate: string | undefined;
  interest: string;
  job_id?: number;
  username?: string;
  save_date?: string;
  apply_date?: string;
  follow_date?: string;
}

export type EntryStateWithoutOptionalProps = Omit<EntryState, 'job_id' | 'username'>;

export type JobProps = {
    job: EntryState;
    submitEntry: (endPoint: string, body: object, method: string) => Promise<void>;
    updateState: (category: keyof EntryStateWithoutOptionalProps, value: string, setterFunc: (value: React.SetStateAction<EntryState>) => void) => void
}

export type JobContainerProps = {
    jobs: EntryState[];
};
