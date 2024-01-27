import { mount,enableAutoUnmount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'

import LoadingButton from '../LoadingButton.vue'

// enableAutoUnmount(afterEach)  

describe('LoaddingButton', () => {

  it('display loader when loading prop is true', async () => {
    const wrapper = mount(LoadingButton, { props: {  loading: true } });

    const loader = wrapper.find('.loader')    
    expect(loader.exists()).toBeTruthy()
  })

  it('display default slot when loading prop is false', async () => {
    const buttonSlot = '<button>Buscar</button>'

    const wrapper = mount(LoadingButton, { 
      slots: {
        default: buttonSlot
      },
      props: {  
        loading: false,
      } 
    });
    const loader = wrapper.find('.loader')    
    expect(loader.exists()).toBeFalsy()

    expect(wrapper.html()).toContain(buttonSlot)    
  })

  it('toggles between loader and content based on loading prop', async () => {

    const wrapper = mount(LoadingButton, { 
      props: {  
        loading: true,
      } 
    });

    expect(wrapper.find('.loader') .exists()).toBeTruthy()

    await wrapper.setProps({ loading: false })    
    expect(wrapper.find('.loader') .exists()).toBeFalsy()

    await wrapper.setProps({ loading: true })    
    expect(wrapper.find('.loader') .exists()).toBeTruthy()

    await wrapper.setProps({ loading: false })    
    expect(wrapper.find('.loader') .exists()).toBeFalsy()
  })

  it('display custom load when loading prop is true', async () => {

    const customLoader = '<i class="fa-sharp fa-light fa-loader"></i>'

    const wrapper = mount(LoadingButton, { 
      slots:{
        load: customLoader
      },
      props: {  
        loading: true,
      } 
    });

    expect(wrapper.find('.fa-loader').exists()).toBeTruthy()   
  })
})