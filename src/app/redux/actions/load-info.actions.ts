import { createActionGroup, emptyProps } from '@ngrx/store';

export const LoadInfoActions = createActionGroup({
  source: 'LoadInfo',
  events: {
    'Load Info': emptyProps(),
  },
});
