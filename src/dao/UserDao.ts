import { Database } from "@/database/Database";
import { User } from "@/models/User";

export class UserDao {

    private db: Database

    constructor() {
        this.db = Database.getInstance();
    }

    async getUserById(id: string): Promise<User> {
        try{
            const user = await this.db.query<User>('SELECT * FROM users WHERE id = ?', [id]);
            return user;
        }catch(err){
            throw err;
        }
    }
}