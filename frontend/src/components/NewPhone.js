import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setNumber] = useState('');
    const [phone_type, setType] = useState('');

    async function createPhone(e) {
        e.preventDefault();
 
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number,
                phone_type
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }
        setNumber('');
        setType('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select onChange={(e) => setType(e.target.value)} value={phone_type}>
                <option value="">Select Category</option>
                <option value="Home">Home</option>
                <option value="Mobile">Mobile</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={phone_number}/>
            <button className='button green' type='submit'>Add {contact.name}'s Phone</button>
        </form>
	);
}

export default NewPhone;