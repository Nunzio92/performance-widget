import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: wizardCreator,
      multi: true,
      deps: [WizardCreatorService, Injector]
    }
  ],
})
export class ChangeDetectionTrickModule {
}
