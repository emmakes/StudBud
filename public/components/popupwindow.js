
//Task Pop-up Window
// Reference: https://github.com/WebDevSimplified/Vanilla-JavaScript-Modal
// I had to manipulate this code to work with my own custom pop-up window.

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modal = document.querySelector(button.dataset.modalTarget) // Selects the modal from html
    openModal(modal)
  })
})

overlay.addEventListener('click', function () {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modal = button.closest('.modal') // Closes the modal div which has the class of modal
    closeModal(modal)
  })
})

// Makes sure active is added or removed depending on if the window is closed or not
// Also activates overlay when pop-up is open

function openModal(modal) {
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}