import { useState } from 'react';

function NewCompany(props) {
    const {contact, companies, setCompanies} = props;
    const [company_name, setCompanyName] = useState('');
    const [company_address, setCompanyAddress] = useState('');

    async function createCompany(e) {
        e.preventDefault();
        
        // Send POST request to create a new company
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_address,// Send company address
                company_name // Send company name
            })
        });

        const data = await response.json();

        if (data.company_id) {
            setCompanies([...companies, data]); // Update with the new company
        }
        setCompanyName(''); // Set the company name input
        setCompanyAddress(''); // Set the company address input
    }

	return (
        <form onSubmit={createCompany} onClick={(e) => e.stopPropagation()} className='new-company'>
            <input
                type="text"
                placeholder="Company Name"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}  //Update company name 
            />
            <input
                type="text"
                placeholder="Company Address"
                value={company_address}
                onChange={(e) => setCompanyAddress(e.target.value)}   //Update company address
            />
            <button className='button green' type='submit'>Add Company</button>
        </form>
	);
}

export default NewCompany;