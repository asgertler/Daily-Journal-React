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
        <>
            <h4>Christmas List</h4>
            <Container fluid>
                <Row>
                    {
                        listArray.map(item => {
                            return (
                                <Col key={item.fbid} className='bgcolor' xs={12} md={6} lg={4} xl={2}>
                                    <h5>{item.title}</h5>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}