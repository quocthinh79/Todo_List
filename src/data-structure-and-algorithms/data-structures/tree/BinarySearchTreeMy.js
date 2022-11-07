class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

export default class BinarySearchTreeMy {
  constructor() {
    this.root = null;
  }
  //inserts a number into the tree. Returns the entire tree.
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    const rnLoop = true;
    while (rnLoop) {
      if (value === current.value) return this;
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
    //     return this;
  }

  insertText(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    const rnLoop = true;
    while (rnLoop) {
      if (`${value}`.localeCompare(`${current.value}`, "pl") === 0) return this;
      if (`${value}`.localeCompare(`${current.value}`, "pl") === -1) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
    //     return this;
  }

  insertTextObject(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    const rnLoop = true;
    while (rnLoop) {
      if (`${value.title}`.localeCompare(`${current.value.title}`, "pl") === 0)
        return this;
      if (
        `${value.title}`.localeCompare(`${current.value.title}`, "pl") === -1
      ) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
    //     return this;
  }

  //finds the given number and returns it. If its not found, returns `null` or `undefined`.
  find(value) {
    if (!this.root) return null;
    let current = this.root;
    const rnLoop = true;
    while (rnLoop) {
      if (!current) return undefined;
      if (value === current.value) return current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }
  //checks if a given number exists in the tree. If its in the tree, returns `true`, otherwise `false`
  contains(value) {
    if (!this.root) return null;
    let current = this.root;
    const rnLoop = true;
    while (rnLoop) {
      if (!current) return false;
      if (value === current.value) return true;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  findMin() {
    if (!this.root) return null;
    let currNode = this.root;

    while (currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode.value;
  }

  findMax() {
    if (!this.root) return null;
    let currNode = this.root;

    while (currNode.right !== null) {
      currNode = currNode.right;
    }
    return currNode.value;
  }

  empty() {
    this.root = null;
  }
}
