import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from 'src/common/constants';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_CONSTANT) {}
