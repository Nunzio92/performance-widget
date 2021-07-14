import { Injectable, Injector } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { ChangeDetectionWizardComponent } from './wizard/change-detection-wizard.component';

@Injectable({
  providedIn: 'root',
})
export class WizardCreatorService {

  constructor() {
  }

  createWizard(injector: Injector) {
    const ComponentElement = createCustomElement(ChangeDetectionWizardComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('app-change-detection-wizard', ComponentElement);


    // Create element
    const changeDetectionWizard: NgElement & WithProperties<ChangeDetectionWizardComponent> =
      document.createElement('app-change-detection-wizard') as any;

    console.log(changeDetectionWizard);
    // Listen to the close event
    changeDetectionWizard.addEventListener('closed', () => document.body.removeChild(changeDetectionWizard));

    // Add to the DOM
    document.body.appendChild(changeDetectionWizard);

  }
}
