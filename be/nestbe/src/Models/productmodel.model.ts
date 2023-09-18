import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductModel {
  public Id: number;
  public Name: string;
}
