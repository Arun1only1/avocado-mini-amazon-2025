import { AxiosResponse } from "axios";

export interface IAddProductResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
