import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ChangeDetectionWizardComponent } from './wizard/change-detection-wizard.component';
import { CommonModule } from '@angular/common';
import { WizardCreatorService } from './wizard-creator.service';

function wizardCreator(wcs: WizardCreatorService, injector: Injector) {
  return wcs.createWizard(injector)
}

@NgModule({
  declarations: [ChangeDetectionWizardComponent],
  imports: [
    CommonModule
  ],
  exports: [ChangeDetectionWizardComponent],
})
export class ChangeDetectionTrickModule {
  public static forRoot(): ModuleWithProviders<ChangeDetectionTrickModule> {
    return {
      ngModule: ChangeDetectionTrickModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: wizardCreator,
          multi: true,
          deps: [WizardCreatorService, Injector]
        }
      ],
    };
  }
}
