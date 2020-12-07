import React, { useEffect, useState } from 'react'
import { getAll } from '../modules/APICalls'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export const List = () => {
    const [listArray, setListArray] = useState([])

    useEffect(() => {
        getAll()
            .then(data => {
                let newArray = Object.keys(data).map((key, index) => {
                    data[key].fbid = key
                    return data[key]
                })
                setListArray(newArray)
            })
    }, [])

    return (
        <Container fluid>
            <form className="form">
                <h2>Christmas List</h2>
                <Row>
                    {
                        listArray.map(item => {
                            return (
                                <Col key={item.fbid} className='bgcolor inputGroup' xs={12} md={6} lg={4} xl={2}>
                                    <input id={item.fbid} name="option2" type="checkbox" />
                                    <label htmlFor={item.fbid}>{item.title}</label>
                                </Col>
                            )
                        })
                    }
                </Row>
            </form>
        </Container>
    )
}