import { AxiosResponse } from "axios";

export interface IEditProductResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
