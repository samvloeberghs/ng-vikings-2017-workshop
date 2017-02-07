import { Session } from './session';

export interface SessionGroup {
  sessions: Session[];
  startHour: number;
  endHour: number;
  hidden?: boolean;
}
