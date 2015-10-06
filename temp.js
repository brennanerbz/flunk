import moment from 'moment';
import assign from 'lodash/object/assign';

var relArray = [
    {
        name: 'Intro to psychology',
        author: 'Brennan Erbeznik',
        last_studied: "2015-10-02 13:34:05.7000"
    },
    {
        name: 'Cognitive Science',
        author: 'Nathan Lomeli',
        last_studied: "2015-09-25 13:34:05.7000"
    },
    {
        name: 'American History',
        author: 'Benjamin Franklin',
        last_studied: "2015-09-12 13:34:05.7000"
    },
    {
        name: 'Computer Science 101',
        author: 'Larry Page',
        last_studied: "2015-10-05 13:34:05.7000"
    },
    {
        name: 'Intro to biology',
        author: 'Nathan Lomeli',
        last_studied: "2015-10-05 09:34:05.7000"
    },
    {
        name: 'American History',
        author: 'Benjamin Franklin',
        last_studied: "2015-08-01 13:34:05.7000"
    },
    {
        name: 'Computer Science 101',
        author: 'Larry Page',
        last_studied: "2015-07-05 13:34:05.7000"
    },
    {
        name: 'Intro to biology',
        author: 'Nathan Lomeli',
        last_studied: "2015-08-05 09:34:05.7000"
    }
];

// var sorted_sets = relArray.reduce(function(list, set) {
//     const date = moment(set['last_studied']);
//     const today = moment();
//     const date_month = moment(set['last_studied']).format('MMMM');
//     const today_month = moment().format('MMMM');
//     let diff = today.diff(date, 'days');

//     if (diff > 30 && today_month !== date_month) {
//         list[set] = list[set] || [];
//         list[set]['category'] = list[set]['category'] || [];
//         list[set]['category'].push(date_month)
//     }
//     return list;

// }, []);

var sorted_sets = relArray.map((set) => {
    const date = moment(set['last_studied']);
    const today = moment();
    const date_month = moment(set['last_studied']).format('MMMM');
    const today_month = moment().format('MMMM');
    let diff = today.diff(date, 'days');

    if (diff > 30 && today_month !== date_month) {
        return assign({}, set, {time_ago: date_month})
    } else if (diff <= 7) {
        return assign({}, set, {time_ago: 'Last studied'})
    } else if (diff > 7 && diff < 14) {
        return assign({}, set, {time_ago: 'Last week'})
    } else if (diff > 14 && diff < 21) {
        return assign({}, set, {time_ago: '2 weeks ago'})
    } else if (diff > 21) {
        return assign({}, set, {time_ago: '3 weeks ago'})
    }

})


console.log(sorted_sets);


// var ProductCategoryRow = React.createClass({
//     render: function() {
//         return (<tr><th colSpan="2">{this.props.category}</th></tr>);
//     }
// });

// var ProductRow = React.createClass({
//     render: function() {
//         var name = this.props.product.stocked ?
//             this.props.product.name :
//             <span style={{color: 'red'}}>
//                 {this.props.product.name}
//             </span>;
//         return (
//             <tr>
//                 <td>{name}</td>
//                 <td>{this.props.product.price}</td>
//             </tr>
//         );
//     }
// });


// var ProductTable = React.createClass({
//     render: function() {
//         var rows = [];
//         var lastCategory = null;
//         this.props.products.forEach(function(product) {
//             if (product.category !== lastCategory) {
//                 rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//             }
//             rows.push(<ProductRow product={product} key={product.name} />);
//             lastCategory = product.category;
//         });
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>{rows}</tbody>
//             </table>
//         );
//     }
// });

// var SearchBar = React.createClass({
//     render: function() {
//         return (
//             <form>
//                 <input type="text" placeholder="Search..." />
//                 <p>
//                     <input type="checkbox" />
//                     {' '}
//                     Only show products in stock
//                 </p>
//             </form>
//         );
//     }
// });

// var FilterableProductTable = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <SearchBar />
//                 <ProductTable products={this.props.products} />
//             </div>
//         );
//     }
// });


// var PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];
 
// React.render(<FilterableProductTable products={PRODUCTS} />, document.body);