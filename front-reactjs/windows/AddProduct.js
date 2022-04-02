import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Modal, Button, Form } from "bootstrap";
import { Link, Navigate, withRouter, useNavigate, useLocation } from "react-router-dom";

async function GetCategories() {
    const response = await fetch('shop/categories');
    const data = await response.json();

    return data;
}

async function SubmitProduct({ title = '', price = 0, description = '', avatar = '', category = '' }) {

    const result = await fetch("shop/create", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                name: title,
                price: price,
                description: description,
                avatar: avatar,
                category: category
            })
    });

    return '';
}

const AddProduct = () => {

    let navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        GetCategories().then((d) => {
            setCategories(d);
        });

    }, []);

    return (

        <main className="container justify-content-center">

            <div className="nav-scroller bg-body shadow-sm">
                <div className="nav nav-underline" aria-label="Secondary navigation">
                    <a className="nav-link active" aria-current="page" href="#" onClick={() => {
                        navigate(-1);
                    }} >Back</a>
                    <a className="nav-link active" aria-current="page" to="/">Dashboard</a>
                </div>
            </div>

            <div className="row justify-content-center">

                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-3 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">Add Product</strong>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

                        <form className="row g-3">

                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Product Name</label>
                                <input onChange={(event) => {
                                    setTitle(event.target.value);
                                }} type="text" className="form-control" name="product_name" placeholder="Product Name" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Price</label>
                                <input onChange={(event) => {
                                    setPrice(event.target.value);
                                }} type="number" className="form-control" name="price" placeholder="Price" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Description</label>
                                <textarea onChange={(event) => {
                                    setDescription(event.target.value);
                                }} className="form-control" name="description" style={{
                                    height: 50,
                                }}></textarea>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Link</label>
                                <input onChange={(event) => {
                                    setAvatar(event.target.value);
                                }} type="text" className="form-control" name="link" placeholder="Link" />
                            </div>
                            <div className="col-12">

                                <label htmlFor="inputAddress" className="form-label">Category</label>
                                <select defaultValue='all' className="form-select" onChange={(event) => {
                                    setCategory(event.target.value);
                                }}>
                                    <option key={'all'} value="all">all</option>
                                    {categories.map(n => {
                                        return <option key={n.name} value={n.name} selected>{n.name}</option>
                                    })}
                                </select>

                            </div>
                            <div className="col-12">
                                <button type="button" className="btn btn-primary mb-3" onClick={() => {

                                    SubmitProduct({
                                        title: title,
                                        description: description,
                                        avatar: avatar,
                                        price: price,
                                        category: category
                                    }).then((r) => {
                                        console.log(r);
                                    });

                                }}>Confirm identity</button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>

        </main>

    );

}

export default AddProduct;