import { type Ref, ref } from 'vue'

export const useModal = () => {
  const isOpen: Ref<boolean> = ref(false)
  const openModal = () => (isOpen.value = true)
  const closeModal = () => (isOpen.value = false)

  return { isOpen, openModal, closeModal }
}
