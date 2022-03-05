let timerId: ReturnType<typeof window.setTimeout> | undefined

const throttle = (func: Function, delay: number) => {
  // if there is a timer initialized delete it
  if (timerId) {
    clearTimeout(timerId)
  }
  // set a new timer with the function that has to be called and the specified delay
  timerId = setTimeout(() => {
    func()
    // Once the function runs clear the  stored timer
    timerId = undefined
  }, delay)
}

export default throttle
