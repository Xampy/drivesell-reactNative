export default class GetUserShopsFirebaseRequest {
    private userDocId: string;

    constructor(userDocId: string) {
        this.userDocId = userDocId;
    }

    public getUserDocId(){return this.userDocId;}
}