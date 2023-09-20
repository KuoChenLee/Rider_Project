import {Container, Navbar,Col,Row} from "react-bootstrap";
import React, {useState} from 'react';
import '../App.css';
import apple2 from '../image/apple2.jpg'
import data from '../Language.json';
import { FormattedMessage, IntlProvider } from "react-intl";
function Home3(){
    function getdata(){
        console.log(data);
    }
    return(
        <div className="background5">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container className="background2">
                <br/>
                <Row>
                    <Col >
                        <img src={apple2} className="apple"/>
                    </Col>
                    <br/>
                    <Col className="background6">
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                    </Col>

                </Row>
                <br/>
                <Row>
                    <Col >
                        <img src={apple2} className="apple"/>
                    </Col>
                    <br/>
                    <Col className="background6">
                        <button onClick={()=>getdata()}>Click</button>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                    </Col>
                </Row>
                <br/>
            </Container>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Home3;