import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Form.css'


export default function Edit() {

    const {id} = useParams()

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

    const removeDiv = (index) => {
        const newArray = [...state.array];
        newArray.splice(index, 1);
        setState({ ...state, array: newArray });
    };

  return (
    <div className='container mt-4'>
         <form>

<div class="form-row">
    <div className="col-2">
        <label>Name:</label>
    </div>
    <div class="col-4">
        <input type="text" class="form-control firstInput" name='name' ></input>
        {/* <label id='name-text' style={{ marginLeft: '-47px' }}>
            {validateName(state.name) ? 'Enter a valid name' : ''}
        </label> */}

    </div>
    <div className="col-2">
        <label>Email:</label>
    </div>
    <div class="col-4">
        <input type="text" class="form-control" name='email'  ></input>
        {/* <label id='name-text' style={{ marginLeft: '3px' }}>
            {validateEmail(state.email) ? 'Enter a valid Email' : ''}
        </label> */}
    </div>
</div>

<div>
    {state.array.map((value, index) => (
        <div class="form-row mt-3">
            <div class="col">
                <input type="text" class="form-control" placeholder="Course" name='course' ></input>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="University" name='university' ></input>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Year" name='year' ></input>
            </div>

            <input type='button' value='-' className='remove-btn' onClick={removeDiv} ></input>

        </div>

    ))} 

    <input type='button' value='+' className='add-btn'onClick={addDiv} ></input>


</div>
<div>
    <input type='button' value='SAVE' className='save-btn' ></input>

</div>
</form>
    </div>
  )
}
