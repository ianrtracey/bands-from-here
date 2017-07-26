export default class WorkQueue {
  constructor(initialState = []) {
    this.contents = initialState
  }

  enqueue(item) {
    this.contents.push(item)
    return true
  }

  dequeue() {
    return this.contents.pop()
  }

  isEmpty() {
    return this.contents.length == 0
  }
}
