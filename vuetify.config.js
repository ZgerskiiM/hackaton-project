import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

export const vuetify = createVuetify({
  components,
  directives,
  VDateInput,
});
