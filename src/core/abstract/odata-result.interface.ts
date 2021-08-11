import { ODataConst } from "../utils/enums";

export interface ODataResult<T> {
    [ODataConst.context]: string;
    [ODataConst.count]: number;
    value: Array<T>;
}