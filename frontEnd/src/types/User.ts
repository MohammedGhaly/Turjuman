export interface User {
  dailyTranslations: {
    count: number;
    date: string;
  };
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isPremium: false;
  isActive: true;
  photo: string;
  loginMethod: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
