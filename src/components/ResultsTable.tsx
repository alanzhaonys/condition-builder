import React from 'react';

interface Props {
  columns: Array<string>;
  rows: Array<object>;
}

function ResultsTable({ columns, rows }: Props) {
  const thRow = () => {
    return (
      <tr>
        {columns.map((column) => {
          return <th key={column}>{column}</th>;
        })}
      </tr>
    );
  };

  const tdRows = () => {
    return rows.map((row) => {
      return (
        <tr>
          {columns.map((column) => {
            return <td>{row[column as keyof typeof row]}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <table className="results-table">
      <thead>{thRow()}</thead>
      <tbody>{tdRows()}</tbody>
    </table>
  );
}

export default ResultsTable;
