const progress = document.querySelector('.circular-progress-1')

const updateProgress = value => {
  progress.style.setProperty('--percentage', `${value * 3.6}deg`)
  progress.innerText = `${value}%`
}

updateProgress(0)

document.querySelector('input')
  .addEventListener('input', e => {
    updateProgress(e.currentTarget.value)
  })

