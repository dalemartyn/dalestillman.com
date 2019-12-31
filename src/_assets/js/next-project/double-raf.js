export default function double_raf(cb) {
  return requestAnimationFrame(function () {
    requestAnimationFrame(cb)
  })
}
