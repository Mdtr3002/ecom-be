import { Token, TokenDocument } from '../../models/token.model';
import { UserDocument } from '../../models/user.model';

type UserAuth = Partial<Token> & Partial<UserDocument>;

declare global {
    namespace Express {
        interface User extends UserAuth {}
    }
}
