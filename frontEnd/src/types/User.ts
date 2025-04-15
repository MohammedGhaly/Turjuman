export interface User {
  dailyTranslations: {
    count: number;
    date: string;
  };
  photo: string;
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isPremium: false;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
