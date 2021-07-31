import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
    client_id: string;
    client_secret: string;
}

export const getEnvironmentVariables = () => {
    if(process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    }
    else {
        return DevEnvironment;
    }
}