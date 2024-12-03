import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserRoles } from './auth';

@Directive({
  selector: '[appIfRole]',
  standalone: true
})
export class IfRoleDirective implements OnInit, OnDestroy {
  @Input() appIfRole: UserRoles | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.role$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((role) => {
        if (role === this.appIfRole) {
          this.view.createEmbeddedView(this.template);
        } else {
          this.view.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
