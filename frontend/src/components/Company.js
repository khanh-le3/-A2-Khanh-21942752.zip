import React, { useState } from 'react';

function Company(props) {
  const { contact, company, companies, setCompanies } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(company.company_name);
  const [companyAddress, setCompanyAddress] = useState(company.company_address);

  async function deleteCompany() {
    const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.company_id, {
        method: 'DELETE',
    });

    let newCompanies = companies.filter((p) => {
        return p.company_id !== company.company_id;
    });
    setCompanies(newCompanies);
  }

  async function updateCompany(e) {
    e.preventDefault();
    try {
        // Send PUT request to update the company details
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.company_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: companyName,     // Send updated company name
                company_address: companyAddress, // Send updated company address
            }),
        });

        // Check if the update was successful
        if (response.ok) {
            const updatedCompany = await response.json(); 

            // Update the state with the updated company
            const updatedCompanies = companies.map((c) =>
                c.company_id === updatedCompany.company_id ? updatedCompany : c
            );
            setCompanies(updatedCompanies);
            setIsEditing(false); // Exit edit mode
        } else {
            console.error('Failed to update company');
        }
    } catch (error) {
        console.error('Error updating company:', error);
    }
  }

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </td>
          <td style={{ width: '14px' }}>
            <button className="button green" onClick={updateCompany}>Save</button>
            <button className="button red" onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{company.company_name}</td>
          <td>{company.company_address}</td>
          <td style={{ width: '14px' }}>
            <button className="button green" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="button red" onClick={deleteCompany}>Delete Company</button>
          </td>
        </>
      )}
    </tr>
  );
}

export default Company;

