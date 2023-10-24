import React, { useState } from 'react'
import './Form.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form() {
    const [state, setState] = useState({
        name: '',
        email: '',
        array: [{ course: '', university: '', year: '' }]

    })

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

    const validateName = (name) => {
        const validRegex = /^[A-Za-z ]+/;
        return !validRegex.test(name);
    };
    const validateEmail = (email) => {
        const validRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
        return !validRegex.test(email);
    };

    const validateEducation = () => {
        const array = state.array;
        let errorMessages = [];
    
        array.forEach(function (element, index) {
            if (element.course === '' || element.university === '' || element.year === '') {
                errorMessages.push('Null Error ');
            }
            const reg = /^[1-9]\d{3,}$/;
            if (!reg.test(element.year)) {
                errorMessages.push('Year Error ');
            }
        });
    
        if (errorMessages.length > 0) {
            toast.error('Null Error / Year format Error', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return false;
        }
    
        return true;
    };
    




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

    const save = () => {
        if (validateName(state.name)) {
            toast.error('Invalid  Name!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        if (validateEmail(state.email)) {
            toast.error('Invalid Email!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        if (!validateEducation()) {
            return; // Don't proceed with saving if education validation fails.
        }



        console.log(state);
        axios.post('http://127.0.0.1:8000/api/RegisterDetails', state).then((response) => {
            console.log(response);
            window.alert('success')


        }).catch((error) => {
            console.log(error.response.data.message);

            window.alert(error.response.data.message)

        })

    }

    // console.log(state);

    return (
        <div className='container mt-5'>
            <ToastContainer />
            <form>

                <div class="form-row">
                    <div className="col">
                        <label>Name:</label>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control firstInput" name='name' onChange={inputChange} ></input>
                        <label id='name-text' style={{ marginLeft: '-47px' }}>
                            {validateName(state.name) ? 'Enter a valid name' : ''}
                        </label>

                    </div>
                    <div className="col">
                        <label>Email:</label>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name='email' onChange={inputChange} ></input>
                        <label id='name-text' style={{ marginLeft: '3px' }}>
                            {validateEmail(state.email) ? 'Enter a valid Email' : ''}
                        </label>
                    </div>
                </div>

                <div>
                    {state.array.map((value, index) => (
                        <div class="form-row mt-3">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Course" name='course' onChange={(e) => educationChange(e, index)} value={value.course || ""}></input>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="University" name='university' onChange={(e) => educationChange(e, index)} value={value.university || ""}></input>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Year" name='year' onChange={(e) => educationChange(e, index)} value={value.year || ""}></input>
                            </div>

                            <input type='button' value='-' className='remove-btn' onClick={() => removeDiv(index)}></input>

                        </div>

                    ))}

                    <input type='button' value='+' className='add-btn' onClick={addDiv}></input>


                </div>
                <div>
                    <input type='button' value='SAVE' className='save-btn' onClick={save}></input>

                </div>
            </form>

        </div>
    )
}
