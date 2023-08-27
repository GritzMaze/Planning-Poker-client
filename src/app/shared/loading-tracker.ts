import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, distinctUntilChanged, shareReplay, startWith, takeUntil, take, skipWhile, endWith } from 'rxjs/operators';

export interface IResource {
  name: string;
  startTime: Date;
}

export class LoadingTracker {
  private resources$ = new BehaviorSubject<IResource[]>([]);
  private disposed$ = new Subject<void>();

  loadingResources$ = this.resources$.pipe(
    distinctUntilChanged((a, b) => a.length === b.length),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith([] as IResource[])
  );

  isLoading$ = this.loadingResources$.pipe(map(resources => resources.length > 0));

  private createResource(name: string): IResource {
    return { name, startTime: new Date() };
  }

  private setLoading(resource: IResource, state: boolean) {
    if (state) {
      this.resources$.next([...this.resources$.value, resource]);
    } else {
      this.resources$.next(this.resources$.value.filter(r => r !== resource));
    }
  }

  addLoadee(loadee$: Observable<any>, name: string) {
    const loadeeResource = this.createResource(name);

    this.setLoading(loadeeResource, true);

    loadee$.pipe(
      takeUntil(this.disposed$),
      take(1),
      endWith(false),
    ).subscribe(() => this.setLoading(loadeeResource, false));
  }

  track(loading$: Observable<boolean>, name: string): Subscription {
    const resource = this.createResource(name);

    return loading$.pipe(
      skipWhile((loading) => !loading),
      distinctUntilChanged(),
    ).subscribe(isLoading => this.setLoading(resource, isLoading));
  }

  dispose() {
    this.disposed$.next();
    this.disposed$.complete();
    this.resources$.complete();
  }
}
