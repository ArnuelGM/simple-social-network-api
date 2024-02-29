import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.data?.length > 0) {
          data.data.forEach((post) => {
            if (post?.user) {
              delete post.user.password;
            }
          });
        }
        return data;
      }),
    );
  }
}
