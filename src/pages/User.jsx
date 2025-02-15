import React, { useState  } from 'react';
import SectionPage from "../component/SectionPage";

const User = () => {
    const [data, setData] = useState([
        { id: 1, name: 'User 1', role: 'Admin' },
        { id: 2, name: 'User 2', role: 'Kenek' },
        { id: 3, name: 'User 3', role: 'Admin' },
        { id: 4, name: 'User 4', role: 'Kenek' },
        { id: 5, name: 'User 5', role: 'Kenek' }, 
    ]);

    const column = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Role', field: 'role' },
    ];

    return (
        <SectionPage title="User" height={600}>
            <div className="table-container">
                <table className="data-table" style={{ width: '30%' }}>
                    <thead>
                        <tr>
                            {column.map((col) => (
                                <th key={col.field} className="table-header">
                                    {col.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                {column.map((col) => (
                                    <td key={col.field} className='table-cell'>
                                        {row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SectionPage>
    );
};

export default User;