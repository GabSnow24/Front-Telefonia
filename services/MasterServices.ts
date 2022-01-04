import ApiServices from "./ApiServices";

export default class MasterService {
  protected api_service: ApiServices;
  protected endpoint: string;
  constructor(endpoint: string) {
    this.api_service = new ApiServices();
    this.endpoint = endpoint;
  }

  public create = async (data: any) => {
    const response = await this.api_service.RequestData(
      "POST",
      this.endpoint,
      data,
      ""
    );
    return response;
  };

  public readAll = async () => {
    const response = await this.api_service.RequestData(
      "GET",
      this.endpoint,
      ""
    );
    return response;
  };

  public readOne = async (ID: any) => {
    const response = await this.api_service.RequestData(
      "GET",
      this.endpoint,
      ID
    );
    return response;
  };

  public update = async (ID: any, data: any) => {
    const response = await this.api_service.RequestData(
      "PUT",
      this.endpoint,
      data,
      ID
    );
    return response;
  };
  public delete = async (ID: any) => {
    const response = await this.api_service.RequestData(
      "DELETE",
      this.endpoint,
      ID
    );
    return response;
  };
}
