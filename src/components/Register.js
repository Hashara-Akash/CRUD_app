import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        program: "",
        program_cost: "",
        phone: "",
        register_date: "",
        address: "",
        program_details: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, program, program_cost, phone, register_date, address, program_details } = inpval;

        const res = await fetch("http://localhost:8003/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, program, program_cost, phone, register_date, address, program_details
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputName1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputName1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputProgram1" className="form-label">Program</label>
                        <input type="text" onChange={setdata} value={inpval.program} name="program" className="form-control" id="exampleInputprogram1" aria-describedby="program" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputProgram_Cost" className="form-label">Program Cost</label>
                        <input type="text" onChange={setdata} value={inpval.program_cost} name="program_cost" className="form-control" id="exampleInputprogram_cost1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputPhone1" className="form-label">Mobile Number</label>
                        <input type="number" onChange={setdata} value={inpval.phone} name="phone" className="form-control" id="exampleInputPhone1" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputregister_date1" className="form-label">Register Date</label>
                        <input type="text" onChange={setdata} value={inpval.register_date} name="register_date" className="form-control" id="exampleInputregister_date1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputAddress1" className="form-label">Address</label>
                        <input type="text" onChange={setdata} value={inpval.address} name="address" className="form-control" id="exampleInputAddress1" />
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Program details</label>
                    <textarea onChange={setdata} value={inpval.program_details} name="program_details" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" onClick={addinpdata} className="btn btn-primary">Register Student</button>
            </form>
        </div>
    )
}

export default Register