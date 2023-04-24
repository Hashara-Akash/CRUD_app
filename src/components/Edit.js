import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'

const Edit = () => {
    const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");
    const [inpval,setINP] = useState({
        name:"",
        email:"",
        age:"",
        phone:"",
        program:"",
        address:"",
        program_details:""
    })

    const setdata = (e)=>{
        console.log(e.target.value);
        const {name,value} = e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }
    const { id } = useParams("");
    console.log(id);

    const getdata = async () => {

        const res = await fetch(`http://localhost:8003/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,program,program_cost,address,phone,program_details,register_date} = inpval;

        const res2 = await fetch(`http://localhost:8003/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,program,program_cost,address,phone,program_details,register_date
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            <NavLink to="/">Home@</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputName1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputName1"/>
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Program</label>
                        <input type="text" onChange={setdata} value={inpval.program} name="program" className="form-control" id="exampleInputProgram" aria-describedby="program" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputAge1" className="form-label">Register Date</label>
                        <input type="number" onChange={setdata} value={inpval.register_date} name="register_date" className="form-control" id="exampleInputregister_date" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputPhone1" className="form-label">Mobile Number</label>
                        <input type="number" onChange={setdata} value={inpval.phone} name="phone" className="form-control" id="exampleInputPhone1" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputwork1" className="form-label">Program_cost</label>
                        <input type="number" onChange={setdata} value={inpval.program_cost} name="program_cost" className="form-control" id="exampleInputprogram_cost1" />
                    </div>
                    <div className="mb-3 col-lg6 col-md-6 col-12">
                        <label for="exampleInputAddress1" className="form-label">Address</label>
                        <input type="text" onChange={setdata} value={inpval.address} name="address" className="form-control" id="exampleInputAddress1" />
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Program details</label>
                    <textarea onChange={setdata} value={inpval.des} name="des" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" onClick={updateuser} class="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default Edit
