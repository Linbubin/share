class App extends Component {
	constructor() {
		super();
		this.state = {
			list: [{ name: 'zs', id: 1 },
			{ name: 'ls', id: 2 },
			{ name: 'ww', id: 3 }]
		};
	}
	addAheadItem() {
		this.setState({
			list: [{ name: 'zq', id: 4 }, ...this.state.list]
		});
	}
	addBehindItem() {
		this.setState({
			list: [...this.state.list, { name: 'zq', id: 4 }]
		});
	}
	render() {
		return (
			<div>
				<h2>当key用index时，因为新unshift一条数据，index都+1，但是react根据key来刷新，所以就导致原有的数据出现在刚插入的数据上(在index的zs,ls,ww的input里随便输入一些数字，自行测试)</h2>
				<div>
					<button onClick={() => { this.addAheadItem(); }}>
						添加到头部
				</button>
					<button onClick={() => { this.addBehindItem(); }}>
						添加到尾部
				</button>
					<br />
					<br />
					使用index作为索引
				<div>
						{this.state.list.map((item, index) => {
							return (
								<li key={index}>
									{item.name}
									<input type="text" />
								</li>
							);
						})}
					</div>
					<br />
					<br />
					使用id作为索引
				<div>
						{this.state.list.map((item, index) => {
							return (
								<li key={item.id}>
									{item.name}
									<input type="text" />
								</li>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}