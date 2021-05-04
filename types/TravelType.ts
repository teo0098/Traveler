export type TravelType = {
  description: string | null;
  payAttention: string | null;
  startTime: string;
  endTime: string;
  images: Array<{
    image_url: string;
    image_desc: string | null;
  }>;
  users: Array<{
    id: number;
    username: string;
  }>;
};
