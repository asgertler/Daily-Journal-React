import React, { useEffect, useState } from 'react'
import { getAll } from '../modules/APICalls'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'

export const List = () => {
    const [listArray, setListArray] = useState([])

    const alphaArray = [...listArray].sort(function (a, b) {
        let textA = a.title.toUpperCase()
        let textB = b.title.toUpperCase()

        return textA.localeCompare(textB)
    })

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

    const handleCheckChange = evt => {
        let newListArray = [...alphaArray]
        newListArray.map(item => {
            if (item.fbid === evt.target.id) {
                item.checked = item.checked ? false : true
            }
            return item
        })
    }

    return (
        <Container fluid>
            <form className="form">
                <h2>Christmas List</h2>

                <ProgressBar animated
                    now={`${listArray.length * 10}`}
                    label={`${listArray.length * 10}%`} />
                {
                    alphaArray.map(item => {
                        return (
                            <Row key={item.fbid} className='bgcolor inputGroup'>
                                <Col className='formCol'>
                                    <input
                                        id={item.fbid}
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={handleCheckChange}
                                    />
                                    <label htmlFor={item.fbid}>{item.title}</label>
                                </Col>
                            </Row>
                        )
                    })
                }
            </form>
        </Container>
    )
}