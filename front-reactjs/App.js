import React, { Component,  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Navigate, Location, NavLink, withRouter, BrowserRouter } from "react-router-dom";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true, categories: [] };
    }

    componentDidMount() {
        this.populateProductData("");
        this.GetCategories();
    }

    refreshProducts() {

    }

    renderProductsTable(products, categories) {

        return (
                
                <div className="row justify-content-center">

                    {products.map(product =>

                        <div className="col-md-6">
                            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col p-3 d-flex flex-column position-static">
                                    <strong className="d-inline-block mb-2 text-primary">{product.category}</strong>
                                    <h3 className="mb-0">
                                        <Link to={{
                                            pathname: "product",
                                            //search: "?sort=name",
                                            //hash: "#the-hash",
                                            key: product.id,
                                        }} state={product} key={product.id}>{product.name}</Link>
                                    </h3>
                                    <Link to={{
                                        pathname: "product",
                                        //search: "?sort=name",
                                        //hash: "#the-hash",
                                        key: product.id,
                                    }} state={product} key={product.id}>
                                        <div className="mb-1 text-muted">${product.price}</div>
                                    </Link>
                                </div>
                                <div className="col-auto d-none d-lg-block">

                                    <img src={product.avatar} alt={product.name} style={{
                                        height: 130
                                    }} className="img-thumbnail rounded float-end img-fluid" />

                                </div>
                            </div>
                        </div>

                    )}

                </div>

        );
    }

    render() {

        return (
            <main className="container">

                <div className="nav-scroller bg-body shadow-sm">
                    <nav className="nav nav-underline" aria-label="Secondary navigation">
                        <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
                        <Link className="nav-link" to="add-product">Add Product</Link>
                        <a className="nav-link" href="javascript:void(0)" onClick={() => {
                            this.populateProductData("");
                        }}>All</a>
                        {this.state.categories.map(c =>
                            <a className="nav-link" href="javascript:void(0)" onClick={() => {
                                this.populateProductData(c.name);
                            }}>{c.name}</a>
                        )}
                    </nav>
                </div>

                {this.state.loading ? (
                    <p>Loading...</p>
                ) : (
                    this.renderProductsTable(this.state.products, this.state.categories)
                )}

            </main>
        );
    }

    async populateProductData(category) {
        this.setState({ loading: true });
        const response = await fetch('shop/index');
        const data = await response.json();
        const result = await this.getProductsFromResource(data, category);

        return result;
    }

    async getProductsFromResource(data, category) {

        let products = [];
        if (category != '') {
            data.map((p) => {
                if (p.category == category) {
                    products.push(p);
                }
            });
            this.setState({ products: products, loading: false });
            return products;
        } else {
            this.setState({ products: data, loading: false });
            return data;
        }
    }

    async GetCategories() {
        const response = await fetch('shop/categories');
        const data = await response.json();
        this.setState({ categories: data });
    }

}
