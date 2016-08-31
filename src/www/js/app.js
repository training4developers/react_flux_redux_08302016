import 'bootstrap-loader';
import '../css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class ListItemComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			item: props.item
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	componentWillReceiveProps(nextProps) {
		console.dir(nextProps);

		this.setState({
			item: nextProps.item
		});
	}


	render() {

		console.log(this.props.item);

		return <li>
			<span>{this.props.item}</span>
			<input type="text" name="item" value={this.state.item} onChange={this.onChange} />
		</li>;
	}

}

ListItemComponent.propTypes = {
	item: React.PropTypes.string.isRequired
};

class ListComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: props.items.concat()
		};

		setTimeout(() => {
			this.setState({
				items: this.state.items.slice(1)
			});
		},3000);
	}

	render() {

		return <div><h1>{this.props.header}</h1><ul>
			{this.state.items.map(item => <ListItemComponent key={item} item={item} />)}
		</ul></div>;

	}

	static get propTypes() {

		return {
			header: React.PropTypes.string,
			items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
		};

	}

}

// ListComponent.propTypes = {
// 	header: React.PropTypes.string,
// 	items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// };

ListComponent.defaultProps = {
	header: 'My List Component'
};



const items = ['first','second','third'];

ReactDOM.render(<ListComponent header="Intuit Rocks!" xitems={items} />, document.querySelector('main'));