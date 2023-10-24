import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import './View.css'

export default function View() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [state, setState] = useState()
    const [state2, setState2] = useState()
    console.log(id);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getSingleUserEducation/${id}`).then((response) => {
            console.log(response.data.data);
            setState(response.data.data)
        }).catch((error) => {
            console.log(error);
        })
        axios.get(`http://127.0.0.1:8000/api/getSingleUser/${id}`).then((response) => {
            console.log(response.data.data[0]);
            setState2(response.data.data[0])
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    const back = () => {
        navigate('/users')
    }


    return (
        <div style={{background:'black'}} className='div-back'>
            <div className="container">
                <MDBCard className="mb-4 mt-4">
                    <MDBCardBody>
                        {state2 ? (
                            <MDBRow>
                                <MDBCol sm="6">
                                    <MDBCardText>Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="6">
                                    <MDBCardText className="text-muted">{state2.name}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        ) : null}
                        <hr />
                        {state2 ? (
                            <MDBRow>
                                <MDBCol sm="6">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="6">
                                    <MDBCardText className="text-muted">{state2.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        ) : null}
                    </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mt-4">
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol sm="4">
                                <MDBCardText>Course</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="4">
                                <MDBCardText>University</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="4">
                                <MDBCardText>Year</MDBCardText>
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        {state ? (
                            state.map((item, index) => (
                                <div key={index}>
                                    <MDBRow>
                                        <MDBCol sm="4" className="">
                                            <MDBCardText className="text-muted">{item.course}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="4">
                                            <MDBCardText className="text-muted">{item.university}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="4">
                                            <MDBCardText className="text-muted">{item.year}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                </div>
                            ))
                        ) : null}
                        <button type="button" className="btn btn-dark" onClick={back}>
                            Back
                        </button>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </div>
    );
}
