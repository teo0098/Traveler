export type TravelType = {
  description: string | null;
  payAttention: string | null;
  startTime: string | null;
  endTime: string | null;
  images: Array<{
    image_url: string;
    image_desc: string | null;
  }>;
  users: Array<{
    id: number;
    username: string;
  }>;
};
