import { describe, it, expect, afterEach } from "vitest";
import CustomModal from "../CustomModal.vue";
import { mount, enableAutoUnmount } from "@vue/test-utils";


enableAutoUnmount(afterEach)  // desmonta depues de cada prueba

describe('CustomModal', () => {
  it('the modal teleports to the body', async() => {
    mount(CustomModal)

    const modalInBody = document.body.querySelector('.container-modal');    
    expect(modalInBody).not.toBeNull();
    expect(document.body.contains(modalInBody)).toBe(true);
  })

  it('the modal is not visible', async() => {
    mount(CustomModal)

    const modalInBody = document.body.querySelector('.container-modal');    
    expect(window.getComputedStyle(modalInBody!).display).toBe('none')
  })

  it('the modal is visible', async() => {
    mount(CustomModal, { props: { show: true } })

    const modalInBody = document.body.querySelector('.container-modal');    
    expect(window.getComputedStyle(modalInBody!).display).toBe('block')
  })

})