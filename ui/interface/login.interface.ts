import { AxiosResponse } from "axios";

export interface ILoginResponse extends AxiosResponse {
  data: {
    accessToken: string;
    userDetails: {
      firstName: string;
      lastName: string;
      role: string;
      email: string;
      gender: string;
      dob: string;
      address: string;
      _id: string;
    };
    message: string;
  };
}
