export type ServerError = {
    log: string,
    status?: number, 
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