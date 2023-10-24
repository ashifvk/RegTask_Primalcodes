import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form.css'
import axios from 'axios'


export default function Edit() {

    const { id } = useParams()
    // console.log(id);
    const [state, setState] = useState({
        name: '',
        email: '',
        array: [{ course: '', university: '', year: '' }]

    })
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getSingleUser/${id}`)
            .then((response) => {
                const variable = response.data.data[0];
                setState((prevState) => ({
                    ...prevState,
                    email: variable.email,
                    name: variable.name
                }));
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://127.0.0.1:8000/api/getSingleUserEducation/${id}`)
            .then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    array: response.data.data
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

   

    const addDiv = () => {
        let newDiv = {
            course: '',
            university: '',
            year: '',
        }
        const newArray = [...state.array];
        newArray.push(newDiv)
        setState({ ...state, array: newArray })
    }
    const inputChange = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
    const educationChange = (event, index) => {
        const { name, value } = event.target;
        const newArray = [...state.array];
        newArray[index][name] = value;
        setState({ ...state, array: newArray });
    }
    

    const removeDiv = (index) => {
        const newArray = [...state.array];
        newArray.splice(index, 1);
        setState({ ...state, array: newArray });
    };


    const save = ()=>{
        console.log(state);

    }

    return (
        <div className='container mt-4'>
            <form>

                <div class="form-row">
                    <div className="col-2">
                        <label>Name:</label>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control firstInput" name='name' onChange={inputChange} defaultValue={state.name} ></input>
                        {/* <label id='name-text' style={{ marginLeft: '-47px' }}>
            {validateName(state.name) ? 'Enter a valid name' : ''}
        </label> */}

                    </div>
                    <div className="col-2">
                        <label>Email:</label>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" name='email' onChange={inputChange} defaultValue={state.email}></input>
                        {/* <label id='name-text' style={{ marginLeft: '3px' }}>
            {validateEmail(state.email) ? 'Enter a valid Email' : ''}
        </label> */}
                    </div>
                </div>

                <div>
                    {state.array?.map((value, index) => (
                        <div class="form-row mt-3">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Course" name='course'  onChange={(e) => educationChange(e, index)} defaultValue={value.course} ></input>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="University" name='university'  onChange={(e) => educationChange(e, index)} defaultValue={value.university} ></input>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Year" name='year'  onChange={(e) => educationChange(e, index)} defaultValue={value.year} ></input>
                            </div>

                            <input type='button' value='-' className='remove-btn' onClick={() => removeDiv(index)}></input>

                        </div>

                    ))}

                    <input type='button' value='+' className='add-btn' onClick={addDiv} ></input>


                </div>
                <div>
                    <input type='button' value='UPDATE' className='save-btn'onClick={save} ></input>

                </div>
            </form>
        </div>
    )
}
