import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import './Users.css'

export default function Users() {
    const navigate = useNavigate()
    const [state, setState] = useState()

    const navigating = () => {
        navigate('/add')

    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/GetallUserAPI').then((response) => {
            console.log(response.data.data);
            setState(response.data.data)
        }).catch((error) => {
            console.log(error);
        })

    }, [])

function edit(id) {
    console.log(id);
    navigate(`/edit/${id}`)

}
function view(id) {
    console.log(id);
    navigate(`/view/${id}`)
}


    return (
        <div >
            <div className="container mt-5">
                <button type="button" class="btn btn-dark" onClick={navigating}>Add</button>
                <div className="users">

                    <MDBCard className="mb-4 mt-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText >Email</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            {state?.map((item, index) => (
                                <div key={index}>
                                    <MDBRow>
                                        <MDBCol sm="3" className=''>
                                            <MDBCardText className="text-muted">{item.name}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted">{item.email}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="2">
                                            <a className="link" href=''onClick={()=>{edit(item.id)}}>Edit</a>
                                            <a className="link ml-4" href='' onClick={()=>{view(item.id)}}>View</a>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                </div>
                            ))}




                        </MDBCardBody>
                    </MDBCard>


                </div>
            </div>
        </div>
    )
}
