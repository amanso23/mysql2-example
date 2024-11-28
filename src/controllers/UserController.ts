import { UserDao } from "@/dao/UserDao";
import { Request, Response } from "express";

export class UserController {

    private userDao: UserDao

    constructor() { 
        this.userDao = new UserDao();
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const user = await this.userDao.getUserById(id);
            
            if(!user){
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: user
            });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Error fetching user"
            });
        }
    } 
}