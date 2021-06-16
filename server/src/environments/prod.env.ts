import { Environment } from "./env";

export const ProdEnvironment: Environment = {
    db_url: 'mongodb+srv://CodersGarage:<password>@cluster0.hnqwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    jwt_secret: 'secret',
    apiKey: 'none',
    url: 'none'
}