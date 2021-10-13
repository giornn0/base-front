import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

export const GenericDelay = ({
}: {
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error:any, i) => {
        const retryAttempt = i + 1;
        if ((retryAttempt >1 ||error.status !=419)){
          return throwError(error);
        }
        return timer(2000);
      }),
      finalize(() => {}),
  );
};