# 二叉树
> 高,根节点,中间节点,叶子节点,左孩子,右孩子

## 排序二叉树
> 左孩子< 父节点, 右孩子 > 父节点

```js
function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

function insertNode(node1, node2){
    if(node1.key > node2.key){
        if(node1.left){
            insertNode(node1.left, node2);
        }else{
            node1.left = node2;
        }
    }else{
        if(node1.right){
            insertNode(node1.right, node2);
        }else{
            node1.right = node2;
        }
    }
}



function insert(key){
    var node = new Node(key);
    if(root){
        insertNode(root, node)
    }else{
        root = node;
    }
}

var root = null;
[8,3,10,1,6,14,4,7,13].forEach(item => {
    insert(item)
});
console.log(root);
```

## 中序遍历
```js
function inOrderTraversNode(node){
    if(node !== null){
        inOrderTraversNode(node.left);
        console.log(node.key);
        inOrderTraversNode(node.right);
    }
}
```

## 前序遍历
## 后序遍历