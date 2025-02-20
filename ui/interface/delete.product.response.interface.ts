import { AxiosResponse } from "axios";

export interface IDeleteProductResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
