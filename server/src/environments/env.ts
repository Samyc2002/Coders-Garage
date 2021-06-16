import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
    db_url: string;
    jwt_secret: string;
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