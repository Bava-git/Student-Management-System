import React, { useState } from 'react';

const ExpandableTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const data = [
    { id: 1, name: 'Alice', details: 'Alice is a software engineer.' },
    { id: 2, name: 'Bob', details: 'Bob is a product manager.' },
    { id: 3, name: 'Charlie', details: 'Charlie is a designer.' },
  ];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <tr>
              <td>{row.name}</td>
              <td>
                <button onClick={() => toggleRow(row.id)}>
                  {expandedRow === row.id ? 'Hide Details' : 'Show Details'}
                </button>
              </td>
            </tr>
            {expandedRow === row.id && (
              <tr>
                <td colSpan="2">{row.details}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ExpandableTable;
