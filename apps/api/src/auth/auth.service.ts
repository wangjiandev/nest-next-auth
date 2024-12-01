import { UserService } from 'src/user/user.service';
import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { verify } from 'argon2';
import type { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);
        if (user) {
            throw new ConflictException('User already exists');
        }
        return await this.userService.create(createUserDto);
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatched = await verify(user.password, password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            id: user.id,
            name: user.name,
        };
    }

    async login(id: number, name?: string) {
        const { access_token } = await this.generateToken(id);
        return {
            id,
            name,
            access_token,
        };
    }

    async generateToken(id: number) {
        const payload: AuthJwtPayload = { sub: id };

        const [accessToken] = await Promise.all([
            this.jwtService.signAsync(payload),
        ]);

        return { access_token: accessToken };
    }
}
