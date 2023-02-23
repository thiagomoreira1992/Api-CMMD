type auth = {
    secret: string;
    expiresIn: string;
}

export class AuthConfig{
    getAuthConfig(){
        return {secret:"default", expiresIn:"1d"}
        }
}
