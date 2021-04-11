class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }


  // ================================ INSERT =====================================
  // implemented using recursion
  // O(log(n)) - average case, b/c each row in balanced tree contains 2x as many 
  // nodes as before, width grows exponentially with number of nodes. Meaning height
  // grows logarithmically w/ number of nodes
  // O(1) = best case would be inserting root only 
  insert(key, value) {
    // tree empty, this node will become root of tree
    if (this.key = null) {
      this.key = key
      this.value = value
    }

    // if tree already exists, start at root, & compare it to key you want to insert
    // if new key is less than node's key, then go to left branch
    else if (key < this.key) {
      // if existing node doesn't have left child (empty left pointer),
      // then instantiate and insert new node as left child of that node,
      // passing 'this' as the parent
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      }
      // if node has existing left child, recursively call insert method so node 
      // is added further down the tree
      else {
        this.left.insert(key, value)
      }
    }
    // similarly, if new key is greater than the node's key, then you do the 
    // same thing, but on the right side
    else {
      if (this.right = null) {
        this.right = new BinarySearchTree(key, value, this)
      }
      else {
        this.right.insert(key, value)
      }
    }
  }


  // ================================= FIND ======================================

  // using recursion to find item in BST
  // O(log(n)) - average case, traverses height of balanced tree
  // O(n) - worst case, when tree is skewed left or righ and you're searching 
  // for node at the bottom where everything is inserted to 1 side
  // O(1) - best case, node you're trying to find is root node
  find(key) {
    // if item is found at root, then return that value
    if (this.key == key) {
      return this.value
    }
    // if item you're looking for is less than the root, follow left child
    // if there is existing left child, then recursively check its left and/or
    // right child until you find the item
    else if (key < this.key && this.left) {
      return this.left.find(key)
    }
    // if item you're looking for is greater than root, follow right child
    // if there is existing right child,, then recursively check its left and/or
    // right child until you find item
    else if (key > this.key && this.right) {
      return this.right.find(key)
    }
    // you have searched tree and item is not in tree
    else {
      throw new Error('Key error')
    }
  }


  // ================================ REMOVE =====================================


  // O(1) - best case, use similar logic to insertion and retrieval
  // O(log(n) - average case
  // O(n) - worst case

  // to remove node with 2 children, find successor to replace removed node
  // 1. find minimum value in right subtree
  // 2. replace value of node to be removed w/ found minimum 
  // - now right subtree contains duplicate
  // 3. apply remove() to right subtree to remove duplicate
  remove(Key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }
      // if node only has left child, then replace node with its left child
      else if (this.left) {
        this._replaceWith(this.left)
      }
      // if node only has right child, then replace node with its right child
      else if (this.right) {
        this._replaceWith(this.right)
      }
      // if node has no children, simply remove it and any references to it by
      // calling 'this._replaceWith(null)
      else {
        this._replaceWith(null)
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key)
    }
    else if (key > this.key && this.right) {
      this.right.remove(key)
    }
    else {
      throw new Error('Key error')
    }
  }
  // ==================== HELPER METHODS TO REMOVE NODE ==========================


  // used to find node you wanna use to replace node that has children
  // if the node you're replacing has parent, then wire up references from parent
  // to the replacement node, and replacement node back to the parent
  // otherwise if node is root node, just copy over properties of replacement node
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node
      }
      else if (this == this.parent.right) {
        this.parent.right = node
      }
      if (node) {
        node.parent = this.parent
      }
    }
    else {
      if (node) {
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      }
      else {
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }


  // used to find minimum value from right subtree
  // when removing node from tree w/ 2 children, replace the node w/ smallest node from right subtree
  _findMin() {
    if (!this.left) {
      return this
    }
    return this.left._findMin()
  }


}