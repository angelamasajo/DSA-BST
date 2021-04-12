class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key
      this.value = value
    }
    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      } 
      else {
        this.left.insert(key, value)
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      }
      else {
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value
    }
    else if (key < this.key && this.left) {
      return this.left.find(key)
    }
    else if (key > this.key && this.right) {
      return this.right.find(key)
    }
    else {
      throw new Error('Key error')
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }
      else if (this.left) {
        this._replaceWith(this.left)
      }
      else if (this.right) {
        this._replaceWith(this.right)
      }
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

  _findMin() {
    if (!this.left) {
      return this
    }
    return this.left._findMin
  }
}

// ========================== DRILLS 1, 2, 3 ======================================

main = () => {
  let BST = new BinarySearchTree()

  BST.insert(3)
  BST.insert(1)
  BST.insert(4)
  BST.insert(6)
  BST.insert(9)
  BST.insert(2)
  BST.insert(5)
  BST.insert(7)

  // easyQuestion = [ 'E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']
  // for (let value of easyQuestion) {
  //   BST.insert(value, null)
  // }

  return BST
}

// console.log(main())


// ================================ DRILL 4 =======================================


// What does this program do? Without running this code in your code editor, 
// explain what the following program does. Show with an example the result of 
// executing this program. What is the runtime of this algorithm?

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

// THhis program adds up all the the values of the nodes in the tree
// O(log(n)) is the run time, because it's traversing through the tree


// ================================ DRILL 5 =======================================

// Height of a BST. Write an algorithm to find the height of a binary search tree. 
// What is the time complexity of your algorithm?

function BSTHeight(BST) {
  // if tree is empty, return 0
  if (BST.key === null) {
    return 0
  }
  // if root has left or right node, +1
  // recursive call
  if (BST.left && BST.right) {
    if(BSTHeight(BST.left)> BSTHeight(BST.right)) {
      return BSTHeight(BST.left) + 1
    }
    else {
      return BSTHeight(BST.right) + 1
    }
  }
  else if (BST.left) {
    return BSTHeight(BST.left) + 1
  }
  else if(BST.right) {
    return BSTHeight(BST.right) + 1
  }
  else {
    return 0
  }
}

// ================================ DRILL 6 =======================================

// Write an algorithm to check whether an arbitrary binary tree is a binary search 
// tree, assuming the tree does not contain duplicates.

function isItBST(tree) {
  // if tree is falsy, return false
  if (!tree) {
    return false
  }
  if (tree.right) {
    if (tree.right.key > tree.key) {
      isItBST(tree.right)
    }
    else {
      return false
    }
  }
  if (tree.left) {
    if (tree.left.key < tree.key) {
      isItBST(tree.left)
    }
    else {
      return false
    }
  }
  return true
}

// console.log(isItBST(main()));


// ================================ DRILL 7 =======================================

// Write an algorithm to find the 3rd largest node in a binary search tree.

function thirdLargest(tree) {
  const array = []
  const subRec = (tree) => {
    if (!tree) {
      return
    }
    // push the keys from the tree into the array
    array.push(tree.key)
    subRec(tree.left)
    subRec(tree.right)
  }
  // sort the array
  subRec(tree)
  array.sort()
  // length - 3 to make it third largest
  return array[array.length - 3]
}

// console.log(thirdLargest(main()))


// ================================ DRILL 8 =======================================

// Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 
// leaves differ in distance from the root by more than 1).




// ================================ DRILL 9 =======================================

// ARE THEY THE SAME BSTs?
// You are given two arrays which represent two sequences of keys that are used 
// to create two binary search trees. Write a program that will tell whether 
// the two BSTs will be identical or not without actually constructing the tree. 
// You may use another data structure such as an array or a linked list but don't 
// construct the BST. What is the time complexity of your algorithm? 
// E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays 
// but will create the exact same BSTs and your program should return true.


const array1 = [3, 5, 4, 6, 1, 0, 2];
const array2 = [3, 1, 5, 2, 4, 6, 0];

function areTheyTheSame(array1, array2) {
  if (array1.length !== array2.length) {
    return false
  }
  let arr1 = array1.sort(function(a, b) {
    return a - b
  })
  let arr2 = array2.sort(function(a, b) {
    return a - b
  })
  for (let i = 0; i < array1.length; i++) {
    if(arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

console.log(areTheyTheSame(array1, array2))