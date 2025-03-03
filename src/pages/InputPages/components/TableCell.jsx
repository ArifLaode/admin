import React from "react";
import { column } from '../constant/index'

const TableCell = () => {
    return (
        <div className="table-conatiner">
            <table className="data-table" style={{ width: "100%" }}>
            <thead>
                <tr>
                {column.map((col) => (
                    <th key={col.accessor} className="table-header">
                    {col.Header}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <tr
                    key={item.resi}
                    className={index % 2 === 0 ? "even" : "odd"}
                >
                    {column.map((col) => (
                    <td key={col.accessor} className="table-cell">
                        {item[col.accessor]}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}