import { mount } from 'svelte';

import VariableFontsA from './components/VariableFontsA.svelte';
import VariableFontsB from './components/VariableFontsB.svelte';

mount(VariableFontsA, { target: document.getElementById('variable-fonts-a') });
mount(VariableFontsB, { target: document.getElementById('variable-fonts-b') });
