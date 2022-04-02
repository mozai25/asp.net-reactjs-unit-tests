import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Modal, Button, Form } from "bootstrap";
import { Link, Navigate, withRouter, useNavigate, useLocation } from "react-router-dom";

async function DeleteItem(item, win) {

    console.log(item);

    const result = await fetch("shop/delete/" + item.id, { method: "DELETE" });
    const data = await result.json();
    win.hide();

    return data;
}

//useNavigate support only functional component :(
const ProductItem = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var win = null;

    let navigate = useNavigate();
    let location = useLocation();
    const [productInfo, setProductInfo] = useState(location);
    
    useEffect(() => {
        console.log(location);
        win = new Modal(document.getElementById('exampleModal'));
    });

    return (

        <main className="container justify-content-center">

            <div class="nav-scroller bg-body shadow-sm">
                <div class="nav nav-underline" aria-label="Secondary navigation">
                    <a class="nav-link" to="/">Back</a>
                    <a class="nav-link active" aria-current="page" href="#" onClick={() => {
                        navigate(-1);
                    }} >Dashboard</a>
                </div>
            </div>

            <div class="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Item</h5>
                            <button type="button" class="btn-close" onClick={() => {
                                win.hide();
                            }}></button>
                        </div>
                        <div class="modal-body">
                            Would you like to delete?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => {

                                DeleteItem(productInfo.state, win).then((d) => {
                                    navigate(-1);
                                });

                            }} class="btn btn-primary">Delete?</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-3 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{productInfo.state.category}</strong>
                        <h3 className="mb-0">
                            {productInfo.state.name}
                        </h3>
                        <div className="mb-1 text-muted">${productInfo.state.price}</div>
                        <div className="mb-1 text-muted">${productInfo.state.description}</div>
                        <div className="mb-1 text-muted">
                            <a href="javascript:void(0)" onClick={() => {
                                navigate(-1);
                            }}>Back</a>
                        </div>
                        <div className="mb-1 text-muted">
                            <a href="javascript:void(0)" style={{
                                color: 'red',
                            }} onClick={() => {
                                win.show();
                            }} >Delete</a>
                        </div>
                    </div>
                    <div className="col-auto d-none d-lg-block">

                        <img src={productInfo.state.avatar} alt={productInfo.state.name} style={{
                            height: 330
                        }} className="img-thumbnail rounded float-end img-fluid" />

                    </div>
                </div>
            </div>

        </main>
    ); 
}

export default ProductItem;