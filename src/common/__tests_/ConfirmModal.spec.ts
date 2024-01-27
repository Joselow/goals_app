import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import ConfirmModal from '@/common/ConfirmModal.vue';
import CustomModalVue from '../CustomModal.vue';
import LoadingButton from '../LoadingButton.vue'

describe('ComfirmModal', () => {
  it('render with props correctly', async () => {
    const title = 'Hola confirma wn'
    const wrapper = mount(ConfirmModal, { props: { title: title} });

    expect(wrapper.findComponent(CustomModalVue).exists()).toBe(true);
    expect(wrapper.findComponent(LoadingButton).exists()).toBe(true);
    expect(document.body.textContent).toContain(title)
  })
})