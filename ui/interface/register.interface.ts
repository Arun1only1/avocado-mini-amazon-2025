import { AxiosResponse } from "axios";

export interface RegisterUserResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
