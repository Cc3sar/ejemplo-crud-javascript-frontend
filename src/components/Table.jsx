import { useState } from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  if (!data || data.length === 0) {
    return <div>No hay datos para mostrar</div>;
  }

  const keys = Object.keys(data[0]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <style>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: inline-block;
          margin-right: 5px;
        }
        table + div a {
          text-decoration: none;
          padding: 8px;
          background-color: #4caf50;
          color: white;
          border-radius: 5px;
        }
        a:hover {
          background-color: #45a049;
        }
      `}</style>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
              <td>
                <button onClick={() => onEdit(row)}>Editar</button>
                <button onClick={() => onDelete(row)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="!#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
