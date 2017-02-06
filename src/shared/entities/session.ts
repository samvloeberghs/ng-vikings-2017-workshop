import { Speaker } from './speaker';

export interface Session {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  room: string;
  hidden: boolean;
  speakers: Speaker[];
};
