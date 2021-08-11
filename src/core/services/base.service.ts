import axios, { AxiosResponse } from "axios";
import settings from "@/core/utils/app-settings";
import { ODataResult } from "@/core/abstract/odata-result.interface";
import { ODataQueryBaseOption ,ODataQueryOption} from "@/core/models/odata-query-option.model";

export interface IBaseService<T>{
    odata(action?:string,queryOption?: ODataQueryOption): Promise<AxiosResponse<ODataResult<T>>>;
    getAll(action:string,queryOption?: ODataQueryOption): Promise<AxiosResponse<T[]>>;
    getById(id: string | number): Promise<AxiosResponse<T>>;
    delete(id: string | number): Promise<AxiosResponse<T>>
    post(data: T): Promise<AxiosResponse<T>>;
    put(id: string | number, data: T): Promise<AxiosResponse<T>>
}
export class BaseService<T> implements IBaseService<T> {
    public apiUrl: string;
    public odataUrl: string;
    public controller: string;
    constructor(controller: string) {
        this.controller = controller;
        this.apiUrl = settings.API_URL + "api/" + controller + "/";
        this.odataUrl = settings.API_URL + "odata/" + controller + "/";
    }

    public setODataQuery(odataQuery?:  ODataQueryBaseOption | ODataQueryOption): ODataQueryBaseOption | ODataQueryOption {
        odataQuery = odataQuery || new ODataQueryBaseOption();
        odataQuery.$skip = odataQuery.$top * (odataQuery.$top - 1) || 0;
        return odataQuery;
    }

    public async odata(action = '',queryOption?: ODataQueryOption): Promise<AxiosResponse<ODataResult<T>>> {
        const params = this.setODataQuery(queryOption);
        const url = action ? `${this.odataUrl}${action}`:this.odataUrl;
        const response = await axios.get<ODataResult<T>>(url, { params });
        return response;
    }

    public async getAll(action = 'query',queryOption?: ODataQueryOption): Promise<AxiosResponse<T[]>> {
        const params = this.setODataQuery(queryOption);
        const url = action ? `${this.apiUrl}${action}`:this.apiUrl;
        const response = await axios.get<T[]>(url, { params });
        return response;
    }

    public async getById(id: string | number): Promise<AxiosResponse<T>> {
        const response = await axios.get<T>(this.apiUrl + id);
        return response;
    }

    public async delete(id: string | number): Promise<AxiosResponse<T>> {
        const response = await axios.delete<T>(this.apiUrl + id);
        return response;
    }

    public async post(data: T): Promise<AxiosResponse<T>> {
        const response = await axios.post<T>(this.apiUrl, data);
        return response;
    }

    public async put(id: string | number, data: T): Promise<AxiosResponse<T>> {
        const response = await axios.put<T>(this.apiUrl + id, data);
        return response;
    }
}
