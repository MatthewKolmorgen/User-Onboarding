import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {
    const [data, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        terms: true
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        terms:''
    })

    const [post,setPost] = useState()
    const validateChange = (evt) => {
        yup.reach(schema, evt.target.name)
        .validate(evt.target.value)
        .then((valid) => {
            setErrors({...errors, [evt.target.name] : ''})
        })
        .catch((err) => {
            setErrors({...errors, [evt.target.name]:err.errors[0]})
        })
    }

    const onChange = evt => {
        evt.persist()
        const newFormData = {...data, [evt.target.name]: evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value} 
        validateChange(evt)
        setFormData(newFormData)
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('https://reqres.in/api/users/data', data)
        .then((res) => {
            setPost(res.data)
            setFormData({
                name: '',
                email:'',
                password:'',
                terms: true
            })
        })
        .catch((err) => {
            console.log(err.response)
        })
    }
    
    const schema = yup.object().shape({
        name: yup.string().required('Name Is Needed'),
        email: yup.string().email('Enter a Valid Email').required('Valid Email Is Needed'),
        password: yup.string().required('A Password Is Needed'),
        terms: yup.boolean().oneOf([true], 'Accept Terms Of Service')
    })

    useEffect(() => {
        schema.isValid(data)
        .then((isValid) => {
            setButtonDisabled(!isValid)
        })
    }, [data])

    return(
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>
                Name
                <input id='name'
                    type='text' 
                    name='name'
                    value={data.name}
                    onChange={onChange}
                />
              {errors.name.length > 3 ? <p>{errors.name}</p> : undefined}
            </label>
            <label htmlFor='email'>
                Email
                <input id='email' 
                    type='email' 
                    name='email'
                    value={data.email}
                    onChange={onChange}
                />
                {errors.email.length > 0 ? <p>{errors.email}</p> : undefined}
            </label>
            <label htmlFor='password'>
                Password
                <input id='password'
                    type='password' 
                    name='password'
                    value={data.password}
                    onChange={onChange}
                />
                {errors.password.length > 0 ? <p>{errors.password}</p> : undefined}
            </label>
            <label htmlFor = 'terms'>
                Terms of Service
                <input id='terms'
                       type='checkbox' 
                       name='terms'
                       checked={data.terms}
                       onChange={onChange}
                />
                {errors.terms.length > 0 ? <p>{errors.terms}</p> : undefined}
            </label>
            <button disabled = {buttonDisabled} type = 'submit'>Submit</button>
            <pre>{JSON.stringify(post, undefined, 1)}</pre>
        </form>
    )
}

export default Form