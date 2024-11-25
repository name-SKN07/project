const modal = document.querySelector('.modal')
const triggerButton = document.querySelector('#btn-get')
const closeButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

triggerButton.onclick = () => openModal()
closeButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

// setTimeout(openModal,10000)
