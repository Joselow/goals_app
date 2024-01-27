import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import GoalsList from '../GoalsList.vue';
import Card from '@/common/GoalCard.vue';
import ConfirmModal from '@/common/ConfirmModal.vue';

describe('GoalsList', () => {
  it('opens confirm modal on delete click', async () => {
    const wrapper = mount(GoalsList);
    
    // Simular clic en el botón de eliminación

    // const CardV = await wrapper.findComponent({name: 'Card'})
    // console.log(CardV);
    

    // Verificar que el modal de confirmación esté abierto
    // await wrapper.vm.$nextTick();

    // expect(wrapper.getComponent(ConfirmModal).props('show')).toBe(true);
  });
})