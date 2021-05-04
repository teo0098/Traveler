export interface InformationProps {
  description: string | null;
  payAttention: string | null;
  startTime: string;
  endTime: string;
  users: Array<{
    id: number;
    username: string;
  }>;
}
