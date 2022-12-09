import { Query, Resolver } from '@nestjs/graphql';
import { UserValidator } from 'src/database/validators/user.validor';
import { AdminService } from './admin.service';

@Resolver()
export class AdminResolver {
    constructor(private adminService: AdminService) { }

    @Query(() => [UserValidator])
    async getAllUsers(): Promise<UserValidator[]> {
        return await this.adminService.getAllUsers();
    }

}
