export type SkiPassType = {
  number: string;
  expirationTime: string;
  price: number;
};

export type CoachType = {
  id: number;
  fullname: string;
  skiPass?: SkiPassType;
  category: string;
  sportType: string;
  workExperience?: string;
  dateOfBirth: string;
  sex: string;
  photo: string;
};

export type NewCoachType = {
  coachId?: number;
  fullname: string;
  birthDay: string;
  category: string;
  sportType: string;
  workExperience: string;
  sex: string;
  photo: string;
};

export type VisitorType = {
  id: number;
  fullname: string;
  dateOfBirth: string;
  skiPass: SkiPassType;
  coach: CoachType;
  dateOfVisit?: string;
  photo: string;
  sportType: string;
};

export type NewVisitorType = {
  fullname: string;
  birthDay: string;
  skiPassTime: string;
  sportType: string;
  photo: string;
};

export type UpdateVisitorType = {
  id: number;
  fullname: string;
  birthDay: string;
  skiPass: SkiPassType;
  sportType: string;
  photo: string;
};

export type ConfirmType = {
  isOpen: boolean;
  id?: number;
  photo?: string;
  sportType?: string;
  category?: string;
  title?: string;
  subTitle?: string;
};