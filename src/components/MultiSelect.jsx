import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../utils/constants';
import { useMailService } from '../services/mail.service';
import { useAuthContext } from '../context/auth';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

const MultiSelect = () => {
    const [ searchText, setSearchText ] = useState("")
    const authContext = useAuthContext();
    const mailService = useMailService(authContext.token);
    const [ selectOptions, setSelectOptions ] = useState([])

    const searchQuery = useDebounce(searchText, 1200);

    const handleSearchEmail = async (text) => {
        try {
            const res = await mailService.autoFillEmail(text)
            console.log("res :", res)
            const result = []
            res.autofillItems?.forEach(item => {
                const temp = item["Items"].split(", ")
                if(temp.length > 1) {
                    temp.forEach(email => {
                        const splitEmail = email.split(" <")
                        if(splitEmail[1]) {
                            result.push({
                                label: email,
                                value: splitEmail[1].slice(0, splitEmail[1].length - 1)
                            })
                        } else {
                            result.push({
                                label: email,
                                value: email
                            })
                        }
                    })
                } else {
                    const splitEmail = temp[0].split(" <")
                    if(splitEmail[1]) {
                        result.push({
                            label: temp[0],
                            value: splitEmail[1].slice(0, splitEmail[1].length - 1)
                        })
                    } else {
                        result.push({
                            label: temp[0],
                            value: temp[0]
                        })
                    }
                }
            })
            setSelectOptions(result)
        } catch (error) {
            console.log("Error with handleSearchMails: ",error)
        }
    }

    useEffect(() => {
        handleSearchEmail(searchQuery);
    }, [searchQuery]);
    
    const handleChange = (text) => {
        setSearchText(text)
    }

    const handleMultiSelect = (val) => {
        console.log(val,'sdfskldfjsdfklj')
    }
        
    return (
        <div className="input-group mb-3 d-flex flex-nowrap">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">CC: </label>
            </div>
            <Select 
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                onChange={handleMultiSelect}
                onInputChange={handleChange}
                isMulti
                className='react-multi-select'
                options={selectOptions}
            />
            {/* <input className="form-control custom-multi-select" name="CC" placeholder="CC:" onChange={(e) => handleChange(e)} /> */}
            {/* <select class="custom-multi-select" id="inputGroupSelect01" multiple>
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select> */}
        </div>
    )
}

export default MultiSelect;
