export interface INotification {
  user: {
    fullName: string;
    pinfl: number;
    clientId: string;
  };
  bank: {
    branch: string;
  };
  car: {
    number: string;
    vinCode: string;
    brand: string;
    model: string;
  };
  files: string;
}
