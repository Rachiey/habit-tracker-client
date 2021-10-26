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


const waterProgress = document.querySelector('.circular-progress-water')

const updatWaterProgress = value => {
    waterprogress.style.setProperty('--percentage', `${value * 3.6}deg`)
    waterProgress.innerText = `${value}%`
  }
  
updateProgress(10)
  
document.querySelector('input')
    .addEventListener('input', e => {
      updateProgress(e.currentTarget.value)
    })
  
  