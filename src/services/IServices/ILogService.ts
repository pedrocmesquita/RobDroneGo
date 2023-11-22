export default interface ILogService {
    getAuth(): Promise<String[]>;
    postAuth(email: String): Promise<boolean>;
}