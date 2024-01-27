import { describe, it, expect } from 'vitest'

import { mount, } from '@vue/test-utils'
import ButtonCreateGoal from '../ButtonCreateGoal.vue'
import StoreGoalVue from '../StoreGoal.vue'

describe('ButtonCreateGoal', () => {
  it('renders correctly', async() => {
    const wrapper = mount(ButtonCreateGoal);    
    // expect(wrapper.find('button'))

    expect(wrapper.findComponent(StoreGoalVue).exists()).toBe(true);

    // const owo = wrapper.findComponent({ ref: 'storeGoal' })
    // owo.vm.handleCreateGoal()  
    // expect(wrapper.text()).toContain('Your Goal')
  })
})

