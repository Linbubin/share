// 第一种: handleClick不带参数
class App extends Component {	
  handleClick = () => {
    console.log(123);
  }
	render() {
		return (
			<button onClick={this.handleClick}>点击console.log</button>
		);
	}
}


// 第二种： handleClick带参数
// 先将他在constructor中bind一遍
class App extends Component {	
  constructor(){
    this.handleClick= this.handleClick.bind(this,xxx,xxx,xxxx,xxxx);
  }
  handleClick = (a,b,c,d) => {
    console.log(a,b,c,d);
  }
	render() {
		return (
			<button onClick={this.handleClick}>点击console.log</button>
		);
	}
}

// 还有两种写法， 这两种写法是在render中用箭头函数和bind，这会导致组件在render中，每次都生成一个匿名函数，性能浪费

// 第三种: render中用bind
class App extends Component {	
  handleClick = (a,b,c,d) => {
    console.log(a,b,c,d);
  }
	render() {
		return (
			<button onClick={this.handleClick.bind(this, a,b,c,d)}>点击console.log</button>
		);
	}
}

// 第四种: render里用箭头函数
class App extends Component {	
  handleClick = () => {
    console.log(123);
  }
	render() {
		return (
			<button onClick={() => this.handleClick()}>点击console.log</button>
		);
	}
}