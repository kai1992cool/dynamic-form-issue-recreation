import {
  ApplicationConfig,
  forwardRef,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { StorageOption, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { MyStore } from './store';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControl } from './models';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideStore(
      [MyStore],
      withNgxsStoragePlugin({
        keys: '*',
        storage: StorageOption.SessionStorage,
        namespace: 'mystore',
      }),
      withNgxsReduxDevtoolsPlugin({ disabled: false })
    ),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormControl),
      multi: true,
    },
  ],
};
