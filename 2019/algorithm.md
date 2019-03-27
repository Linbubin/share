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
> 复制
```js
function preOrderTraversNode(node){
    if(node !== null){
        console.log(node.key);
        preOrderTraversNode(node.left);
        preOrderTraversNode(node.right);
    }
}
```
## 后序遍历
> 文件访问
```js
function postOrderTraversNode(node){
    if(node !== null){
        postOrderTraversNode(node.left);
        postOrderTraversNode(node.right);
        console.log(node.key);
    }
}
```

## 二叉树节点查找
### 最小值
```js
function min(node){
    if(node){
        while(node && node.left){
            node = node.left
        }

        console.log(node.key)
    }
    return null
}

// me
function min(node){
    if(node !== null){
        if(node.left){
            min(node.left);
        }else{
            console.log(node.key);
        }
    }
}
```

### 最大值
```js
function max(node){
    if(node){
        while(node && node.right){
            node = node.right
        }

        console.log(node.key)
    }
    return null
}

// me
function max(node){
    if(node !== null){
        if(node.right){
            max(node.right);
        }else{
            console.log(node.key);
        }
    }
}
```

### 查找指定值
```js
function find(node, value, callback){
    if(value === node.key){
        callback(node.key)
    }else if(value < node.key){
        if(node.left){
            find(node.left, value)
        }else{
            console.log('not find::', value)
        }
    }else{
        if(node.right){
            find(node.right, value)
        }else{
            console.log('not find::', value)
        }
    }
}
```

### 删除指定节点
1. 被删除节点没有子节点,删除即可.
2. 被删除节点没有左 或 右子节点,删除后父与其左或右节点相连.
3. 被删除节点同时有左右子节点， 找到被删节点右侧的最小值来代替被删除节点，且删除该最小值节点.(或者用被删节点左侧最大值也可以)

```js
function findMin(node){
    if(node){
        while(node && node.left){
            node = node.left
        }

        return node
    }
    return null
}
function removeNode(node, key){
    if(node === null){
        return null
    }

    if(key < node){
        node.left = removeNode(node.left, key);
    }else if(key > node){
        node.right = removeNode(node.right, key);
    }else{
        // 找到key,开始判断
        if(node.left === null && node.right === null){
            node = null;
            return node
        }
        if(node.left === null){
            node = node.right;
            return node;
        }
        if(node.right === null){
            node = node.left;
            return node;
        }
        const minNode = findMin(node.right);
        node.key = minNode.key;
        node.right = removeNode(node.right, node.key)
        // 或者以下伪代码
        // const maxNode = findMax(node.left);
        // node.key = maxNode.key;
        // node.left = removeNode(node.left, node.key)
    }
}
```