export interface Credentials {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  displayName: string;
  inviteToken: string;
}

export interface InviteTokenDetails {
  token: string;
  invites: number;
}