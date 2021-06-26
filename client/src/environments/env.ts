import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
    apiKey: string;
    url: string;
}

export const getEnvironmentVariables = () => {
    if(process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    }
    else {
        return DevEnvironment;
    }
}